module.exports = {
  db: process.env.MONGO_URL || 'mongodb://mongo/whistler',
  logLevel: process.env.LOG_LEVEL || 'debug',
  port: process.env.PORT || 8080,
};

