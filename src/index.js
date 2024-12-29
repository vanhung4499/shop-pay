const app = require('./app');
const config = require('./config/config');
const { mongoConnect } = require('./config/mongo');
const logger = require('./config/logger');
const initAccounts = require("./bootstrap/init-accounts");

// Import jobs
// const jobs = require('./jobs');
const consumers = require('./listeners');

async function startServer() {
  // Connect to MongoDB
  await mongoConnect();

  await initAccounts();

  app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port} 🚀`);
  });
}

startServer();
