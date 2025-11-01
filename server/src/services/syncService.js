const cron = require("node-cron");
const { fetchDataFromGovAPI } = require("./apiService");
const DistrictPerformance = require("../models/DistrictPerformance");
const logger = require("../utils/logger");

// This is the core ETL (Extract, Transform, Load) function
const syncData = async () => {
  logger.info("[syncService] Starting daily data sync...");

  // 1. EXTRACT
  const rawData = await fetchDataFromGovAPI();
  if (!rawData || rawData.length === 0) {
    logger.warn("[syncService] No data received from API. Aborting sync.");
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  // 2. TRANSFORM & 3. LOAD
  for (const record of rawData) {
    try {
      const cleanData = {
        districtName: record.district,
        state: "Uttar Pradesh", // Hardcoded as per spec
        month: record.month,
        year: record.year,
        workDemanded: record.work_demanded_households,
        workAllotted: record.work_allotted_households,
        avgPaymentDelayDays: record.avg_payment_delay,
        womenParticipationPercent: record.women_persondays_percent,
      };

      // Use 'findOneAndUpdate' with 'upsert'
      // This efficiently inserts a new record OR updates an existing one.
      await DistrictPerformance.findOneAndUpdate(
        {
          districtName: cleanData.districtName,
          month: cleanData.month,
          year: cleanData.year,
        }, // Find by this unique composite key
        cleanData, // The data to insert or update with
        { upsert: true, new: true, setDefaultsOnInsert: true } // Options
      );
      successCount++;
    } catch (err) {
      errorCount++;
      logger.error(
        `[syncService] Failed to process record for ${record.district}`,
        err
      );
    }
  }

  logger.info(
    `[syncService] Sync complete. ${successCount} records processed, ${errorCount} errors.`
  );
};

// This function starts the cron job
const startSyncJob = () => {
  logger.info("Sync job scheduler initialized.");

  // Run the job once on startup to populate the DB
  logger.info("Running initial data sync on startup...");
  syncData();

  // Schedule the job to run at 3:00 AM every day
  cron.schedule(
    "0 3 * * *",
    () => {
      logger.info("--- Running scheduled daily sync ---");
      syncData();
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};

module.exports = { startSyncJob, syncData };
