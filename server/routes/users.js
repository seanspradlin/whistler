const express = require('express');
const User = require('../models').User;
const Errors = require('../lib/errors');

const router = express.Router({ mergeParams: true });

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiVersion 0.1.0
 */
router.get('/', (req, res, next) => {
  next(new Errors.Generic('Not implemented'));
});

/**
 * @api {get} /users/:userId Get specific user
 * @apiName GetUsersId
 * @apiGroup Users
 * @apiVersion 0.1.0
 */
router.get('/:userId', (req, res, next) => {
  next(new Errors.Generic('Not implemented'));
});

module.exports = router;

