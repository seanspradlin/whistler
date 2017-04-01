const express = require('express');
const request = require('request');
const Promise = require('bluebird');
const User = require('../models').User;
const Errors = require('../lib/errors');
const config = require('../config');

const router = express.Router({ mergeParams: true });

function redeemGoogleToken(token) {
  if (!token) {
    return Promise.reject(new Errors.Generic('accessToken required'), 400);
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
 * @apiVersion 1.0.0
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */

/**
 * @api {post} /account/google Login with Google
 * @apiName PostAccountGoogle
 * @apiGroup Account
 * @apiDescription Use Google to log in and then send their access token to generate a user session
 *
 * @apiParam {String} accessToken Google account access token
 *
 * @apiSuccess  {ObjectId}  _id       Unique user identifier
 * @apiSuccess  {String}    name      Name
 * @apiSuccess  {String}    email     Email
 *
 * @apiUse UnprocessableEntityError
 * @apiUse UnauthorizedError
 */
router.post('/google', (req, res, next) => {
  redeemGoogleToken(req.body.accessToken)
    .then((result) => {
      if (result.aud !== config.google.id) {
        return Promise.reject(new Errors.Unauthorized());
      }
      return User.findOne({ googleId: result.sub })
        .then((user) => {
          if (!user) {
            const newUser = new User({
              name: result.name,
              email: result.email,
              googleId: result.sub,
            });
            return newUser.save();
          }
          return Promise.resolve(user);
        });
    })
    .then(user => req.login(user))
    .then((user) => {
      res.body = user;
      next();
    })
    .catch(next);
});

module.exports = router;

