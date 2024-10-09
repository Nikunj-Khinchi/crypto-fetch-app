## Cryptocurrency Data Fetcher

- This is a Node.js application that fetches the current price, market cap, and 24-hour price change of cryptocurrencies (Bitcoin, Ethereum, and Matic) from the CoinGecko API every 2 hours. It stores the data in MongoDB and provides two API endpoints to retrieve the latest data and the standard deviation of price for a cryptocurrency based on the last 100 records.

### Features
- Fetches cryptocurrency data from CoinGecko API every 2 hours using a cron job.
- Stores cryptocurrency data (price, market cap, and 24h change) in MongoDB.
- Provides two endpoints:
- `/stats`: Fetches the latest price, market cap, and 24-hour price change of a cryptocurrency.
- `/deviation`: Returns the standard deviation of the price of the last 100 records for a cryptocurrency.

### Technologies Used
- Node.js: JavaScript runtime for server-side code execution.
- Express: Web framework for building the API.
- Mongoose: MongoDB object modeling tool for handling database operations.
- node-cron: For scheduling the background job to fetch data every 2 hours.
- Winston: For logging important events like errors and success logs.
- MongoDB: NoSQL database to store cryptocurrency data.

### Prerequisites
- Node.js (version 12 or higher)
- MongoDB (local installation or MongoDB Atlas)
- A valid CoinGecko API Key (optional for demo key; replace with production key)

### API End Points

1. `GET /api/stats`
    - Description: Fetches the latest price, market cap, and 24-hour price change for a cryptocurrency.

    - Query Params: coin: The ID of the cryptocurrency. Can be one of bitcoin, ethereum, or matic-network.
    - ex : `localhost:3000/api/stats?coin=bitcoin`

2. `GET /api/deviation`
    - Description: Returns the standard deviation of the price of the last 100 records for a cryptocurrency.

    - Query Params: coin: The ID of the cryptocurrency. Can be one of bitcoin, ethereum, or matic-network.
    - - ex : `localhost:3000/api/deviation?coin=bitcoin`

### Deployed API 
- `https://crypto-fetch-app.onrender.com/api/healthcheck`