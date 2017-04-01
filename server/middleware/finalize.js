const http = require('http');

module.exports = () =>
  (req, res) => {
    if (!res.body && res.statusCode !== 204) {
      res.statusCode = 404;
      res.message = { error: http.STATUS_CODES['404'] };
    }
    res.json(res.body);
  };

