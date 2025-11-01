const DistrictPerformance = require("../models/DistrictPerformance");
const logger = require("../utils/logger");

/**
 * @desc    Get all unique district names for a state
 * @route   GET /api/state/:name/districts
 * @access  Public
 */
const getStateDistricts = async (req, res) => {
  try {
    // We hardcode 'Uttar Pradesh' as per the project spec
    const stateName = "Uttar Pradesh";

    // Find all unique 'districtName' entries for this state
    const districts = await DistrictPerformance.distinct("districtName", {
      state: new RegExp(`^${stateName}$`, "i"),
    });

    if (!districts || districts.length === 0) {
      return res
        .status(404)
        .json({ message: "No districts found for this state." });
    }

    res.status(200).json(districts.sort()); // Send sorted list
  } catch (error) {
    logger.error("Error in getStateDistricts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getStateDistricts };
