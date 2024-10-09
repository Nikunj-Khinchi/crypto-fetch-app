const axios = require('axios');
const Crypto = require('../models/crypto');
const logger = require('../utils/logger');

// Fetch data from CoinGecko and save to the database
const fetchCryptoData = async () => {
    const coins = ['bitcoin', 'ethereum', 'matic-network'];
    try {
        logger.info('Fetching cryptocurrency data from CoinGecko...');

        const options = {
            method: 'GET',
            url: process.env.COINGECKO_API,
            params: {
                ids: coins.join(','),
                vs_currencies: 'usd',
                include_market_cap: 'true',
                include_24hr_change: 'true',
            },
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': process.env.API_KEY, 
            }
        };

        const response = await axios.request(options);
        const data = response.data;

        coins.forEach(async (coin) => {
            if (data[coin]) {
                const coinData = {
                    coin,
                    price: data[coin].usd,
                    marketCap: data[coin].usd_market_cap,
                    '24hChange': data[coin].usd_24h_change,
                };

                await Crypto.create(coinData); 
            } else {
                logger.warn(`No data received for ${coin}`);
            }
        });
        logger.info("Successfully saved data for all coins to the database");
    } catch (error) {
        // Log any error that occurs while fetching or saving data
        logger.error('Error fetching data from CoinGecko: ' + error.message);
    }
};

module.exports = fetchCryptoData;
