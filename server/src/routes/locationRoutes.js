const express = require("express");
const router = express.Router();
const { getDistrictFromCoords } = require("../controllers/locationController");

// e.g., POST http://localhost:5000/api/location/check-district
router.post("/check-district", getDistrictFromCoords);

module.exports = router;
