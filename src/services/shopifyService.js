const shopify = require('../config/shopify');

class ShopifyService {
    async getOrderStatus(email, orderNumber) {
        try {
            console.log('Searching for order:', { email, orderNumber });
            
            // Clean up order number (remove # if present)
            const cleanOrderNumber = orderNumber.replace('#', '');
            
            // Query Shopify for the order
            const orders = await shopify.order.list({
                status: 'any',
                email: email,
                name: cleanOrderNumber
            });

            console.log('Orders found:', orders.length);

            if (!orders.length) {
                throw new Error('Order not found');
            }

            const order = orders[0];
            console.log('Order status:', order.fulfillment_status);
            
            // Check fulfillment status
            if (!order.fulfillments || !order.fulfillments.length) {
                return {
                    status: 'processing',
                    expectedShipDate: this.calculateExpectedShipDate(order.created_at)
                };
            }

            const fulfillment = order.fulfillments[0];
            console.log('Fulfillment:', fulfillment);

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
                trackingNumber: fulfillment.tracking_number,
                trackingUrl: fulfillment.tracking_url,
                currentLocation: fulfillment.current_location || 'In transit',
                expectedDelivery: fulfillment.estimated_delivery_at
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
