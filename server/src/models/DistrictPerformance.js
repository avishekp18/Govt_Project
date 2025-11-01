const mongoose = require("mongoose");

// Renamed to DistrictPerformance for clarity
const DistrictPerformanceSchema = new mongoose.Schema(
  {
    districtName: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      default: "Uttar Pradesh", // Hardcoded as per project spec
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    // --- Key Metrics ---
    workDemanded: {
      type: Number,
      default: 0,
    },
    workAllotted: {
      type: Number,
      default: 0,
    },
    avgPaymentDelayDays: {
      type: Number,
      default: 0,
    },
    womenParticipationPercent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Create an index for fast lookups
DistrictPerformanceSchema.index({ districtName: 1, year: -1, month: -1 });

module.exports = mongoose.model(
  "DistrictPerformance",
  DistrictPerformanceSchema
);
