module.exports = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://mongo/whistler',
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
  port: process.env.PORT || 8080,
  static: process.env.STATIC_ROOT || '/usr/src/static/build',
};

