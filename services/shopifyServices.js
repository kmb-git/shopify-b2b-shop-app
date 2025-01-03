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

exports.createFixedDiscountRule = async (params) => {
  try {
    const customerId = params.customerId; // Replace with the actual customer ID
    const discountValue = -params.value; // Replace with your fixed discount value

    // Create the price rule
    const priceRuleData = {
      price_rule: {
        title: "Fixed Discount for Specific Customer",
        target_type: "line_item",
        target_selection: "all",
        allocation_method: "across",
        value_type: "fixed_amount",
        value: discountValue, // Fixed discount amount
        customer_selection: "prerequisite",
        prerequisite_customer_ids: [customerId], // Specific customer ID
        usage_limit: 1, // Limit to one use
        starts_at: new Date().toISOString(), // Start time
        ends_at: null, // No end time
      },
    };

    const priceRuleResponse = await shopifyAxios.post(
      "/price_rules.json",
      priceRuleData
    );

    const priceRule = priceRuleResponse.data.price_rule;
    console.log("Price Rule Created:", priceRule);

    // Create the discount code associated with the price rule
    const discountCodeData = {
      discount_code: {
        code: params["code"], // Replace with your desired discount code
      },
    };

    const discountCodeResponse = await shopifyAxios.post(
      `/price_rules/${priceRule.id}/discount_codes.json`,
      discountCodeData
    );

    return discountCodeResponse;
    console.log(
      "Discount Code Created:",
      discountCodeResponse.data.discount_code
    );
  } catch (error) {
    console.error(
      "Error creating price rule or discount code:",
      error.response?.data || error.message
    );
    return error;
  }
};

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
        value: "-" + params.value, // 15% Discount
        customer_selection: "prerequisite",
        customer_segment_prerequisite_ids: ["1095860126033"],
        // prerequisite_customer_segments: ["1032241742161"],
        // prerequisite_customer_ids: [8512205259089],
        entitled_product_ids: params.product_id_list, // Replace with actual product IDs
        entitled_variant_ids: params.product_variant_list, // Replace with actual variant IDs
        starts_at: new Date().toISOString(),
      },
    };
    // console.log(priceRuleData);

    // const priceRuleGet = await shopifyAxios.get("/price_rules.json");
    // console.log(priceRuleGet);

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
