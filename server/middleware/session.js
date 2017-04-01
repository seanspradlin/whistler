const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('../config');

module.exports = () => {
  const store = new RedisStore(config.redis);
  const sessionConfig = config.session;
  sessionConfig.store = store;

  return session(sessionConfig);
};

