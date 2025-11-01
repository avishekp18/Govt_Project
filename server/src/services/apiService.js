const axios = require("axios");
const { dataGovApiKey } = require("../utils/config");
const logger = require("../utils/logger");

// THIS IS A SIMULATED FUNCTION
// The real data.gov.in API is complex. This mock simulates the
// data structure our cron job needs.
const fetchDataFromGovAPI = async () => {
  logger.info("[apiService] Fetching data from data.gov.in (SIMULATED)");
  // const API_URL = `https://api.data.gov.in/resource/your-resource-id?api-key=${dataGovApiKey}`;

  try {
    // const response = await axios.get(API_URL);
    // return response.data.records;

    // --- MOCK DATA ---
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const currentYear = new Date().getFullYear();

    return [
      {
        district: "Lucknow",
        month: currentMonth,
        year: currentYear,
        work_demanded_households: 15200,
        work_allotted_households: 14800,
        avg_payment_delay: 5,
        women_persondays_percent: 38.5,
      },
      {
        district: "Varanasi",
        month: currentMonth,
        year: currentYear,
        work_demanded_households: 12100,
        work_allotted_households: 11500,
        avg_payment_delay: 8,
        women_persondays_percent: 41.2,
      },
      // --- Add previous months' data for history ---
      {
        district: "Lucknow",
        month: currentMonth - 1,
        year: currentYear,
        work_demanded_households: 14900,
        work_allotted_households: 14000,
        avg_payment_delay: 7,
        women_persondays_percent: 37.9,
      },
      {
        district: "Varanasi",
        month: currentMonth - 1,
        year: currentYear,
        work_demanded_households: 11800,
        work_allotted_households: 11000,
        avg_payment_delay: 9,
        women_persondays_percent: 40.8,
      },
      // Add more districts and history...
    ];
    // --- END MOCK DATA ---
  } catch (error) {
    logger.error("[apiService] Failed to fetch from data.gov.in", error);
    return []; // Return empty array on failure
  }
};

module.exports = { fetchDataFromGovAPI };
