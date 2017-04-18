const express = require('express');
const User = require('../models').User;
const Errors = require('../lib/errors');

const router = express.Router({ mergeParams: true });

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  name
 * @apiParam  {String}  email
 *
 * @apiSuccess  {Object[]}  users
 * @apiSuccess  {String}    users.name
 * @apiSuccess  {String}    users.email
 * @apiSuccess  {String}    users.googleId
 * @apiSuccess  {String}    users.picture
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.get('/', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    const options = {};

    if (req.body.email) {
      options.email = req.body.email;
    }

    if (req.body.name) {
      options.name = req.body.name;
    }

    User.find(options)
      .then((users) => {
        res.body = users;
        next();
      })
      .catch(next);
  }
});

/**
 * @api {get} /users/:userId Get specific user
 * @apiName GetUsersId
 * @apiGroup Users
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  userId
 *
 * @apiSuccess  {String}  name
 * @apiSuccess  {String}  email
 * @apiSuccess  {String}  googleId
 * @apiSuccess  {String}  picture
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.get('/:userId', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    User.findById(req.params.userId)
      .then((user) => {
        res.body = user;
        next();
      })
      .catch(next);
  }
});

module.exports = router;

