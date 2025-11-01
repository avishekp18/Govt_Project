const fs = require("fs");
const path = require("path");

// Load .env only if it exists (e.g., in local dev)
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  require("dotenv").config({ path: envPath });
}

const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  corsOrigin:
    process.env.CORS_ORIGIN ||
    "http://localhost:3000" ||
    "https://govt-project-six.vercel.app",
  dataGovApiKey: process.env.DATA_GOV_API_KEY,
  geocoder: {
    provider: process.env.GEOCODER_PROVIDER,
    apiKey: process.env.GEOCODER_API_KEY,
  },
};

module.exports = config;
