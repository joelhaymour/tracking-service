const shopify = require('../config/shopify');

class ShopifyService {
    async getOrderStatus(email, orderNumber) {
        try {
            // Query Shopify for the order
            const orders = await shopify.order.list({
                status: 'any',
                email: email,
                name: orderNumber
            });

            if (!orders.length) {
                throw new Error('Order not found');
            }

            const order = orders[0];
            
            // Check fulfillment status
            if (!order.fulfillments.length) {
                return {
                    status: 'processing',
                    expectedShipDate: this.calculateExpectedShipDate(order.created_at)
                };
            }

            const fulfillment = order.fulfillments[0];
            const trackingInfo = fulfillment.tracking_info;

            if (fulfillment.status === 'delivered') {
                return {
                    status: 'delivered',
                    deliveryDate: fulfillment.delivery_date,
                    deliveryLocation: fulfillment.tracking_company
                };
            }

            return {
                status: 'shipped',
                carrier: fulfillment.tracking_company,
                trackingNumber: trackingInfo.number,
                trackingUrl: trackingInfo.url,
                currentLocation: trackingInfo.current_location,
                expectedDelivery: trackingInfo.expected_delivery_date
            };
        } catch (error) {
            console.error('Shopify service error:', error);
            throw error;
        }
    }

    calculateExpectedShipDate(orderDate) {
        const date = new Date(orderDate);
        date.setDate(date.getDate() + 2); // Add 2 business days
        return date.toLocaleDateString();
    }
}

module.exports = new ShopifyService(); 
