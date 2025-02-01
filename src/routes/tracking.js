const express = require('express');
const router = express.Router();
const shopifyService = require('../services/shopifyService');

router.post('/', async (req, res) => {
    try {
        const { email, orderNumber } = req.body;

        if (!email || !orderNumber) {
            return res.status(400).json({ error: 'Email and order number are required' });
        }

        const trackingInfo = await shopifyService.getOrderStatus(email, orderNumber);
        res.json(trackingInfo);
    } catch (error) {
        console.error('Tracking route error:', error);
        res.status(404).json({ error: 'Order not found' });
    }
});

module.exports = router;
