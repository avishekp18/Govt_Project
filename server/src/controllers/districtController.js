const DistrictPerformance = require("../models/DistrictPerformance");
const logger = require("../utils/logger");

/**
 * @desc    Get latest & historical data for one district
 * @route   GET /api/districts/:name
 * @access  Public
 */
const getDistrictPerformance = async (req, res) => {
  try {
    const districtName = req.params.name;
    const districtNameRegex = new RegExp(`^${districtName}$`, "i"); // Case-insensitive

    // 1. Get the single most recent record
    const latest = await DistrictPerformance.findOne({
      districtName: districtNameRegex,
    }).sort({ year: -1, month: -1 }); // Sort by newest first

    if (!latest) {
      logger.warn(`No data found for district: ${districtName}`);
      return res
        .status(404)
        .json({ message: "No data found for this district." });
    }

    // 2. Get the last 6 months of history for charts
    const history = await DistrictPerformance.find({
      districtName: districtNameRegex,
    })
      .sort({ year: -1, month: -1 }) // Newest first
      .limit(6); // Get last 6 records

    // 3. Send both to the frontend
    res.status(200).json({ latest, history });
  } catch (error) {
    logger.error("Error in getDistrictPerformance:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getDistrictPerformance };
