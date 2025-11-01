const express = require("express");
const router = express.Router();
const { getDistrictPerformance } = require("../controllers/districtController");

// e.g., GET http://localhost:5000/api/districts/Lucknow
router.get("/:name", getDistrictPerformance);

module.exports = router;
