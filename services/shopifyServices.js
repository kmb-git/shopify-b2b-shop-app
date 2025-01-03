const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const shopName = "ae255b.myshopify.com";
const accessToken = process.env.ACCESS_TOKEN;

// Shopify store details from .env file
const SHOPIFY_STORE = shopName;
const SHOPIFY_API_KEY = process.env.APIKEY;
const SHOPIFY_PASSWORD = process.env.ACCESS_TOKEN;
const API_VERSION = process.env.API_VERSION;

/**
 * Fetch all products from Shopify
 * @returns {Promise<Array>} List of all products
 */
exports.fetchAllProducts = async () => {
  try {
    let products = [];
    let endpoint = `https://${shopName}/admin/api/2023-10/products.json?limit=250`;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await axios.get(endpoint, {
        headers: {
          "X-Shopify-Access-Token": accessToken,
        },
      });

      // Add products from the current page
      products = [...products, ...response.data.products];

      // Handle pagination via the "Link" header
      const linkHeader = response.headers.link;
      if (linkHeader && linkHeader.includes('rel="next"')) {
        const nextLinkMatch = linkHeader.match(/<(.*?)>; rel="next"/);
        endpoint = nextLinkMatch ? nextLinkMatch[1] : null;
      } else {
        hasNextPage = false;
      }
    }

    console.log(`Fetched ${products.length} products.`);
    return products;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

exports.generateRules = async () => {
  const endpoint = `https://${shopName}/admin/api/2023-10/price_rules.json`;
  const data = {
    price_rule: {
      title: "Tag-Based Discount",
      target_type: "line_item",
      target_selection: "entitled",
      allocation_method: "across",
      value_type: "percentage",
      value: "-10.0", // 10% discount
      customer_selection: "all",
      starts_at: new Date().toISOString(),
      entitled_product_ids: [123456789], // Replace with actual product IDs
      entitled_variant_ids: [987654321], // Replace with actual variant IDs
      prerequisite_product_ids: [],
      prerequisite_variant_ids: [],
    },
  };

  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    });
    console.log("Discount rule created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating discount rule:", error.response.data);
    return error;
  }
};

const shopifyAxios = axios.create({
  baseURL: `https://${SHOPIFY_API_KEY}:${SHOPIFY_PASSWORD}@${SHOPIFY_STORE}/admin/api/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
});

exports.createPriceRule = async (params) => {
  try {
    // Step 1: Create a Price Rule
    const priceRuleData = {
      price_rule: {
        title: params.title,
        target_type: "line_item",
        target_selection: "entitled",
        allocation_method: "across",
        value_type: params.type,
        value: params.value, // 15% Discount
        customer_selection: "prerequisite",
        prerequisite_customer_segments: [
          {
            id: "wholesale_customers",
            name: "WHOLESALE Customers",
            conditions: [
              {
                field: "customer_tag",
                relation: "equals",
                value: "WHOLESALE",
              },
            ],
          },
        ],
        entitled_product_ids: [params.product_id_list], // Replace with actual product IDs
        entitled_variant_ids: [params.product_variant_list], // Replace with actual variant IDs
        starts_at: new Date().toISOString(),
      },
    };

    const priceRuleResponse = await shopifyAxios.post(
      "/price_rules.json",
      priceRuleData
    );
    const priceRule = priceRuleResponse.data.price_rule;
    console.log("Price Rule Created:", priceRule);

    // Step 2: Create a Discount Code for the Price Rule
    const discountCodeData = {
      discount_code: {
        code: params.code,
      },
    };

    const discountCodeResponse = await shopifyAxios.post(
      `/price_rules/${priceRule.id}/discount_codes.json`,
      discountCodeData
    );

    console.log(
      "Discount Code Created:",
      discountCodeResponse.data.discount_code
    );
    return discountCodeResponse;
  } catch (error) {
    console.error(
      "Error creating price rule or discount code:",
      error.response?.data || error.message
    );
    return error;
  }
};

// Execute the function
// createPriceRule();
