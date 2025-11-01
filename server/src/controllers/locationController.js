const NodeGeocoder = require("node-geocoder");
const { geocoder: geocoderConfig } = require("../utils/config");
const logger = require("../utils/logger");

// Initialize the geocoder service
const geocoder = NodeGeocoder({
  provider: geocoderConfig.provider,
  apiKey: geocoderConfig.apiKey,
});

/**
 * @desc    Get district name from latitude/longitude
 * @route   POST /api/location/check-district
 * @access  Public
 */
const getDistrictFromCoords = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required." });
    }

    const geocodeResult = await geocoder.reverse({
      lat: latitude,
      lon: longitude,
    });

    if (!geocodeResult || geocodeResult.length === 0) {
      logger.warn("Reverse geocode returned no results");
      return res.status(404).json({ message: "Could not determine location." });
    }

    // For OpenCage in India, 'county' usually holds the district name
    const districtName = geocodeResult[0].county;

    if (!districtName) {
      logger.warn(
        "Geocode result did not contain a district name",
        geocodeResult[0]
      );
      return res
        .status(404)
        .json({ message: "Could not determine district from location." });
    }

    // Clean up "District" from the name (e.g., "Lucknow District" -> "Lucknow")
    const cleanedName = districtName.replace(/ district/i, "").trim();

    res.status(200).json({ districtName: cleanedName });
  } catch (error) {
    logger.error("Error in getDistrictFromCoords:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getDistrictFromCoords };
