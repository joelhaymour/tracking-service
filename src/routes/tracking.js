const express = require('express');
const router = express.Router();
const shopifyService = require('../services/shopifyService');

router.post('/', async (req, res) => {
    try {
        const { email, orderNumber } = req.body;
        console.log('Received tracking request:', { email, orderNumber });

        if (!email || !orderNumber) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Email and order number are required' });
        }

        const trackingInfo = await shopifyService.getOrderStatus(email, orderNumber);
        console.log('Tracking info found:', trackingInfo);
        res.json(trackingInfo);
    } catch (error) {
        console.error('Tracking route error:', error);
        
        if (error.message === 'Order not found') {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.status(500).json({ 
            error: 'An error occurred while tracking your order',
            details: error.message 
        });
    }
});

module.exports = router; 
