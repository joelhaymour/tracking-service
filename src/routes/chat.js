const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await openaiService.generateResponse(message);
        res.json({ response });
    } catch (error) {
        console.error('Chat route error:', error);
        res.status(500).json({ 
            error: 'An error occurred while processing your message',
            details: error.message 
        });
    }
});

module.exports = router; 
