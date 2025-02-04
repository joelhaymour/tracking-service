const express = require('express');
const router = express.Router();
const gmailService = require('../services/gmailService');

router.post('/', async (req, res) => {
    try {
        const { name, email, instagram, tiktok, twitter, reason } = req.body;

        // Validate required fields
        if (!name || !email || !reason) {
            return res.status(400).json({ 
                error: 'Missing required fields' 
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email format'
            });
        }

        // Send email using Gmail service
        await gmailService.sendCollaborationEmail({
            name,
            email,
            instagram,
            tiktok,
            twitter,
            reason
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Collaboration route error:', error);
        res.status(500).json({ 
            error: 'An error occurred while submitting your collaboration request',
            details: error.message 
        });
    }
});

module.exports = router; 
