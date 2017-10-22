const express = require('express');
const Promise = require('bluebird');
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
 * @apiSuccess  {String}    users.isAdmin
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission restricted
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
 * @apiSuccess  {String}  _id
 * @apiSuccess  {String}  name
 * @apiSuccess  {String}  email
 * @apiSuccess  {String}  googleId
 * @apiSuccess  {String}  picture
 * @apiSuccess  {Boolean} isAdmin
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission restricted
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

/**
 * @api {post} /users Create a new user
 * @apiName PostUsers
 * @apiGroup Users
 * @apiVersion 0.2.0
 * @apiDescription Create a local account. This endpoint is restricted unless no users exist in the
 * database.
 *
 * @apiParam  {String}  email
 * @apiParam  {String}  name
 * @apiParam  {String}  password
 * @apiParam  {String}  isAdmin
 *
 * @apiSuccess  {String}  _id
 * @apiSuccess  {String}  name
 * @apiSuccess  {String}  email
 * @apiSuccess  {String}  isAdmin
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission admin
 */
router.post('/', (req, res, next) => {
  Promise.resolve()
    .then(() => {
      if (req.session.user) {
        if (req.session.user.isAdmin) {
          return Promise.resolve();
        }
        return Promise.reject(new Errors.Unauthorized());
      }
      return User.count({})
        .then((count) => {
          if (count) {
            return Promise.reject(new Errors.Unauthorized());
          }
          return Promise.resolve();
        });
    })
    .then(() => {
      const { email, name, password } = req.body;
      if (!email || !name || !password) {
        return Promise.reject(new Errors.Generic('email, name, and password are required'));
      }
      const newUser = new User({
        name,
        email,
        password: User.generateHash(password),
        isAdmin: req.body.isAdmin || !req.session.user,
      });
      return newUser.save();
    })
    .then((user) => {
      res.body = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      next();
    })
    .catch(next);
});

/**
 * @api {delete} /users/:userId Delete a user
 * @apiName DeleteUserId
 * @apiGroup Users
 * @apiVersion 0.2.0
 *
 * @apiParam  {String}  userId
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission admin
 */
router.delete('/:userId', (req, res, next) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    next(new Errors.Unauthorized());
  } else {
    User.remove({ _id: req.params.userId })
      .then(() => {
        res.status(204);
        next();
      })
      .catch(next);
  }
});

module.exports = router;

