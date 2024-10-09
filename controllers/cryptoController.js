const Crypto = require('../models/crypto');
const logger = require('../utils/logger');

// Helper function to calculate standard deviation
const calculateStandardDeviation = (data) => {
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
    const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
};

// Controller to get the latest stats for a coin
const getStats = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        logger.warn('Coin parameter is missing in /stats request.');
        return res.status(400).json({ error: 'Coin parameter is required' });
    }

    try {
        const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

        if (!latestData) {
            logger.warn(`No data found for ${coin} in /stats request.`);
            return res.status(404).json({ error: 'No data found for the requested coin' });
        }

        logger.info(`Successfully fetched stats for ${coin}`);
        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            '24hChange': latestData['24hChange'],
        });
    } catch (error) {
        logger.error('Error fetching stats: ' + error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to calculate the standard deviation of prices for a coin
const getDeviation = async (req, res) => {
    const { coin } = req.query;
    if (!coin) {
        logger.warn('Coin parameter is missing in /deviation request.');
        return res.status(400).json({ error: 'Coin parameter is required' });
    }
    try {
        const prices = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100).select('price');

        if (prices.length < 2) {
            logger.warn(`No data found for ${coin} in /deviation request.`);
            return res.status(404).json({ error: 'No data found for the requested coin' });
        }

        const priceValues = prices.map((record) => record.price);
        const deviation = calculateStandardDeviation(priceValues);

        logger.info(`Successfully calculated standard deviation for ${coin}: ${deviation}`);
        res.json({ deviation });
    } catch (error) {
        logger.error('Error fetching deviation: ' + error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getStats,
    getDeviation,
};