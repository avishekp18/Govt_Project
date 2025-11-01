require("dotenv").config({ path: process.cwd() + "/.env" }); // Ensure .env is loaded from root

const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  dataGovApiKey: process.env.DATA_GOV_API_KEY,
  geocoder: {
    provider: process.env.GEOCODER_PROVIDER,
    apiKey: process.env.GEOCODER_API_KEY,
  },
};

module.exports = config;
