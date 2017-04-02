const express = require('express');
const account = require('./account');

const router = express.Router();

router.all('/', (req, res) => {
  res.redirect('/api/docs');
});

router.use('/account', account);

module.exports = router;

