const mongoose = require("mongoose");
const { mongoURI } = require("./config");
const logger = require("./logger");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = { connectDB };
