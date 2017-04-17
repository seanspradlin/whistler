const express = require('express');
const account = require('./account');
const projects = require('./projects');
const services = require('./services');
const tickets = require('./tickets');
const users = require('./users');

const router = express.Router();

router.all('/', (req, res) => {
  res.redirect('/api/docs');
});

router.use('/account', account);
router.use('/projects', projects);
router.use('/services', services);
router.use('/tickets', tickets);
router.use('/users', users);

module.exports = router;

