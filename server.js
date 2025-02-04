require('dotenv').config();
const express = require('express');
const cors = require('cors');
const trackingRoutes = require('./src/routes/tracking');
const collaborationRoutes = require('./src/routes/collaboration');

const app = express();

// More specific CORS configuration
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: true
}));

// Log the allowed origin for debugging
console.log('Allowed Origin:', process.env.ALLOWED_ORIGIN);

app.use(express.json());
app.use('/track-order', trackingRoutes);
app.use('/collaborate', collaborationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS enabled for: ${process.env.ALLOWED_ORIGIN}`);
}); 
