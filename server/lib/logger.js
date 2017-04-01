const bunyan = require('bunyan');
const config = require('../config');

const logger = bunyan.createLogger({
  name: 'whistler-server',
  level: config.logLevel,
  serializers: {
    error: (request) => {
      if (!request) {
        return null;
      }
      return {
        method: request.method,
        headers: request.headers,
        url: request.url,
        body: request.body,
        session: request.session,
        error: request.error,
      };
    },
  },
});

module.exports = logger;

