require('dotenv').config();
const express = require('express');
const cors = require('cors');
const trackingRoutes = require('./src/routes/tracking');

const app = express();

app.use(cors({
    origin: ['https://rouqegolf.com', 'http://localhost:3000'],
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(express.json());
app.use('/', trackingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
