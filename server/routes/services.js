const express = require('express');
const Service = require('../models').Service;
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
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    const options = {};
    if (req.body.name) {
      options.name = req.body.name;
    }

    if (req.body.environment) {
      options.environment = req.body.environment;
    }

    if (req.body.project) {
      options.project = req.body.project;
    }

    Service.find(options)
      .then((services) => {
        res.body = services;
        next();
      })
      .catch(next);
  }
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
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Service.findById(req.params.serviceId)
      .then((service) => {
        res.body = service;
        next();
      })
      .catch(next);
  }
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
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else if (!req.body.name || !req.body.environment || !req.body.project) {
    next(new Errors.Generic('Name, environment, and project required'));
  } else {
    const service = new Service({
      name: req.body.name,
      environment: req.body.environment,
      project: req.body.project,
    });
    service.save()
      .then((newService) => {
        res.body = newService;
        next();
      })
      .catch(next);
  }
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
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Service.findById(req.params.serviceId)
      .then((service) => {
        service.name = req.body.name || service.name;
        service.environment = req.body.environment || service.environment;
        service.project = req.body.project || service.project;
        return service.save();
      })
      .then((response) => {
        res.body = response;
        next();
      })
      .catch(next);
  }
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
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Service.findById(req.params.serviceId)
      .remove()
      .then(() => {
        res.status(204);
        next();
      })
      .catch(next);
  }
});

module.exports = router;

