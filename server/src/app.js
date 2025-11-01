const express = require("express");
const cors = require("cors");
const { corsOrigin } = require("./utils/config");

// Import routes
const districtRoutes = require("./routes/districtRoutes");
const stateRoutes = require("./routes/stateRoutes");
const locationRoutes = require("./routes/locationRoutes"); // For the bonus feature

const app = express();

// --- Middleware ---

// Enable CORS
app.use(
  cors({
    origin: corsOrigin,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- API Routes ---
app.use("/api/districts", districtRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/location", locationRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

// --- Error Handling (simple) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
