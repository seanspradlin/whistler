const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('./lib/logger');
const config = require('./config');
const routes = require('./routes');
const session = require('./middleware/session');
const errorHandling = require('./middleware/error-handling');
const finalize = require('./middleware/finalize');

const app = express();

app.use('/api/docs', express.static(`${__dirname}/docs`));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session());
app.use('/api', routes);
app.use(errorHandling());
app.use(finalize());

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});

