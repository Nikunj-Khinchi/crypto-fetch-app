const cron = require('node-cron');
const fetchCryptoData = require('../services/fetchCryptoService');
const logger = require('../utils/logger');

// Run the fetch function immediately when the application starts
(async () => {
    logger.info('Running fetchCryptoData for the first time on startup...');
    await fetchCryptoData();
})();


// Schedule the cron job to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
    logger.info('Running scheduled background job to fetch crypto data...');
    await fetchCryptoData();
});

logger.info('Background job scheduled to run every 2 hours.');
