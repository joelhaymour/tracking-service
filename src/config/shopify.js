const Shopify = require('shopify-api-node');

const shopify = new Shopify({
    shopName: process.env.SHOPIFY_SHOP_NAME,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    apiVersion: '2024-01'
});

module.exports = shopify;
