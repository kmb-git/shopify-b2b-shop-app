const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const shopName = "ae255b.myshopify.com";
const accessToken = process.env.ACCESS_TOKEN;

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
