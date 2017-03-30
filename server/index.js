const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');

const app = express();

winston.level = config.logLevel;

app.use('/api/docs', express.static(`${__dirname}/docs`));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(config.port, () => {
  winston.info(`Server is running on port ${config.port}`);
});

