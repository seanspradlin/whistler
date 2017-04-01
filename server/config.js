module.exports = {
  env: process.env.NODE_ENV || 'development',
  db: process.env.MONGO_URL || 'mongodb://mongo/whistler',
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || 'redis',
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
  port: process.env.PORT || 8080,
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  session: {
    cookie: {
      maxAge: 5 * 60 * 60 * 1000, // 5 hours
      secure: process.env.NODE_ENV === 'production',
    },
    name: 'whstlr-sid',
    proxy: true,
    rolling: true,
    secret: process.env.SESSION_SECRET || 'hunter2',
  }
};

