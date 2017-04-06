const express = require('express');
const Errors = require('../lib/errors');

const router = express.Router({ mergeParams: true });

/**
 * @api {get} /services Get all services
 * @apiName GetServices
 * @apiGroup Services
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  [name]        Name
 * @apiParam  {String}  [environment] Current environment
 * @apiParam  {String}  [project]     Unique ID of project
 *
 * @apiSuccess  {Object[]}  services
 * @apiSuccess  {String}    services._id     Unique ID
 * @apiSuccess  {String}    services.name    Name
 * @apiSuccess  {String}    services.secret  Authorization secret
 * @apiSuccess  {String}    services.project Unique ID of project
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.get('/', (req, res, next) => {
  next(new Errors.Generic('Not implemented', 501));
});

/**
 * @api {get} /services/:serviceId Get a specific service
 * @apiName GetServices
 * @apiGroup Services
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  serviceId
 *
 * @apiSuccess  {String}  _id     Unique ID
 * @apiSuccess  {String}  name    Name
 * @apiSuccess  {String}  secret  Authorization secret
 * @apiSuccess  {String}  project Unique ID of project
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.get('/', (req, res, next) => {
  next(new Errors.Generic('Not implemented', 501));
});

/**
 * @api {post} /services Create a service
 * @apiName PostServices
 * @apiGroup Services
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  name        Name
 * @apiParam  {String}  environment Current environment
 * @apiParam  {String}  project     Unique ID of project
 *
 * @apiSuccess  {String}  _id     Unique ID
 * @apiSuccess  {String}  name    Name
 * @apiSuccess  {String}  secret  Authorization secret
 * @apiSuccess  {String}  project Unique ID of project
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.post('/', (req, res, next) => {
  next(new Errors.Generic('Not implemented', 501));
});

/**
 * @api {put} /services/:serviceId Update a service
 * @apiName PutServiceId
 * @apiGroup Services
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  serviceId   Unique ID of service
 * @apiParam  {String}  name        Name
 * @apiParam  {String}  environment Current environment
 * @apiParam  {String}  project     Unique ID of project
 *
 * @apiSuccess  {String}  _id     Unique ID
 * @apiSuccess  {String}  name    Name
 * @apiSuccess  {String}  secret  Authorization secret
 * @apiSuccess  {String}  project Unique ID of project
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.put('/:serviceId', (req, res, next) => {
  next(new Errors.Generic('Not implemented', 501));
});

/**
 * @api {delete} /services/:serviceId Delete a service
 * @apiName DeleteService
 * @apiGroup Services
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  serviceId   Unique ID of service
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.delete('/:serviceId', (req, res, next) => {
  next(new Errors.Generic('Not implemented', 501));
});

module.exports = router;

