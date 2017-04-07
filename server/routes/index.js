const express = require('express');
const account = require('./account');
const projects = require('./projects');
const services = require('./services');
const tickets = require('./tickets');

const router = express.Router();

router.all('/', (req, res) => {
  res.redirect('/api/docs');
});

router.use('/account', account);
router.use('/projects', projects);
router.use('/services', services);
router.use('/tickets', tickets);

module.exports = router;

