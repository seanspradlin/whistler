const express = require('express');
const request = require('request').defaults({ json: true });
const Promise = require('bluebird');
const User = require('../models').User;
const Errors = require('../lib/errors');
const config = require('../config');

const router = express.Router({ mergeParams: true });

function redeemGoogleToken(token) {
  if (!token) {
    return Promise.reject(new Errors.Generic('token required'), 400);
  }

  return new Promise((resolve, reject) => {
    const uri = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
      + `?id_token=${token}`;
    request(uri, (error, _, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

/**
 * @api {get} /account Get account data
 * @apiName GetAccount
 * @apiGroup Account
 * @apiVersion 0.1.0
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.get('/', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    res.body = req.session.user;
    next();
  }
});

/**
 * @api {post} /account/logout Logout
 * @apiName PostAccountLogout
 * @apiGroup Account
 * @apiVersion 0.1.0
 * @apiDescription Logout of your account.
 *
 * @apiPermission public
 */
router.post('/logout', (req, res, next) => {
  delete req.session.user;
  res.status(204);
  next();
});

/**
 * @api {post} /account/google Login with Google
 * @apiName PostAccountGoogle
 * @apiGroup Account
 * @apiVersion 0.1.0
 * @apiDescription Use Google to log in and then send their access token to generate a user session
 *
 * @apiParam {String} token Google account access token
 *
 * @apiSuccess  {String}  _id       Unique user identifier
 * @apiSuccess  {String}  name      Name
 * @apiSuccess  {String}  email     Email
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission public
 */
router.post('/google', (req, res, next) => {
  redeemGoogleToken(req.body.token)
    .then((result) => {
      if (result.aud !== config.google.id) {
        return Promise.reject(new Errors.Unauthorized());
      }
      return User.findOne({ googleId: result.sub })
        .then((user) => {
          if (user) {
            return Promise.resolve(user);
          }

          const newUser = new User({
            name: result.name,
            email: result.email,
            googleId: result.sub,
            picture: result.picture,
          });
          return newUser.save();
        });
    })
    .then((user) => {
      req.session.user = user;
      res.body = req.session;
      next();
    })
    .catch(next);
});

/**
 * @api {post} /account/login Login
 * @apiName PostAccountLogin
 * @apiGroup Account
 * @apiVersion 0.2.0
 * @apiDescription Login with a local account
 *
 * @apiParam  {String}  email     User email account
 * @apiParam  {String}  password  User password
 *
 * @apiSuccess  {String}  _id
 * @apiSuccess  {String}  name
 * @apiSuccess  {String}  email
 * @apiSuccess  {String}  isAdmin
 *
 * @apiUse InvalidParametersError
 * @apiUse UnauthorizedError
 *
 * @apiPermission public
 */
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new Errors.Generic('email and password are required', 422));
  } else {
    User.findOne({ email })
      .then((user) => {
        if (!user || !user.validPassword(password)) {
          next(new Errors.Unauthorized());
        } else {
          req.session.user = user;
          res.body = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };
          next();
        }
      })
      .catch(next);
  }
});

module.exports = router;

