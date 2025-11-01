const express = require("express");
const router = express.Router();
const { getStateDistricts } = require("../controllers/stateController");

// e.g., GET http://localhost:5000/api/state/uttar-pradesh/districts
router.get("/:name/districts", getStateDistricts);

module.exports = router;
