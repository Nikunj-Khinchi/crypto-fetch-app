const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cryptoRoutes = require('./routes/cryptoRoutes');
const logger = require('./utils/logger');
const connectDB = require('./config/database');
app.use(express.json());

// Import the background job so it starts running
require('./job/fetchCryptoDataJob');

// Connect to the database
connectDB();

// Routes
app.use('/api', cryptoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error("Error: ", err.message);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
