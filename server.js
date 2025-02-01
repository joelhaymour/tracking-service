require('dotenv').config();
const express = require('express');
const cors = require('cors');
const trackingRoutes = require('./src/routes/tracking');

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ['POST']
}));

app.use(express.json());
app.use('/track-order', trackingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
