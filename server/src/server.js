const app = require("./app");
const { connectDB } = require("./utils/db");
const { port } = require("./utils/config");
const { startSyncJob } = require("./services/syncService");
const logger = require("./utils/logger");

// Connect to the database
connectDB()
  .then(() => {
    // Start the Express server
    app.listen(port, () => {
      logger.info(
        `Server running in ${process.env.NODE_ENV} mode on port ${port}`
      );
    });

    // Start the background sync job
    startSyncJob();
  })
  .catch((err) => {
    logger.error("Failed to start server:", err);
    process.exit(1);
  });
