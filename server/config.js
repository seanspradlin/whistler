module.exports = {
  env: process.env.NODE_ENV || 'development',
  db: process.env.MONGO_URL || 'mongodb://mongo/whistler',
  logLevel: process.env.LOG_LEVEL || 'debug',
  port: process.env.PORT || 8080,
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
};

