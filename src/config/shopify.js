const Shopify = require('shopify-api-node');

const shopify = new Shopify({
    shopName: '4c4148-3',
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    apiVersion: '2024-01'
});

// Add error handling for initialization
shopify.on('error', (err) => {
    console.error('Shopify API Error:', err);
});

module.exports = shopify; 
