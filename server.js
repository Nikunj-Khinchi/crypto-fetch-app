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

app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Crypto Fetch API!</h1>
        <p>This API provides real-time cryptocurrency data for Bitcoin, Ethereum, and Matic.</p>
        <p>Use the following endpoints to access the data:</p>
        <ul>
            <li>
                <strong>/api/stats</strong> (GET) - Fetch the latest cryptocurrency data for a specific coin.
                <br/>
                <em>Example: <code>/api/stats?coin=bitcoin</code></em>
            </li>
            <li>
                <strong>/api/deviation</strong> (GET) - Get the standard deviation of the price for the last 100 records for a specific coin.
                <br/>
                <em>Example: <code>/api/deviation?coin=ethereum</code></em>
            </li>
        </ul>
        <p><strong>Coins supported:</strong> <em>bitcoin</em>, <em>ethereum</em>, and <em>matic-network</em>.</p>
    `);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
