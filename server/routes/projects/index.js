const express = require('express');
const Project = require('../../models').Project;
const Errors = require('../../lib/errors');

const router = express.Router({ mergeParams: true });

/**
 * @api {get} /projects Get all projects
 * @apiName GetProjects
 * @apiGroup Projects
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  name
 *
 * @apiSuccess  {Object[]}  projects
 * @apiSuccess  {String}    projects._id
 * @apiSuccess  {String}    projects.name
 * @apiSuccess  {Process[]} projects.processes
 * @apiSuccess  {Object[]}  projects.subscribers
 * @apiSuccess  {Boolean}   projects.subscribers.isAdmin
 * @apiSuccess  {User}      projects.subscribers.user
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

    Project.find(options)
      .populate(['owner', 'subscribers', 'processes'])
      .then((projects) => {
        res.body = projects;
        next();
      })
      .catch(next);
  }
});

/**
 * @api {get} /projects/:projectId Get specific project
 * @apiName GetProjectId
 * @apiGroup Projects
 * @apiVersion 0.1.0
 *
 * @apiSuccess  {String}    _id
 * @apiSuccess  {String}    name
 * @apiSuccess  {Process[]} processes
 * @apiSuccess  {Object[]}  subscribers
 * @apiSuccess  {Boolean}   subscribers.isAdmin
 * @apiSuccess  {User}      subscribers.user
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.get('/:projectId', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Project.findById(req.params.projectId)
      .populate(['owner', 'subscribers', 'processes'])
      .then((project) => {
        res.body = project;
        next();
      })
      .catch(next);
  }
});

/**
 * @api {post} /projects Create a project
 * @apiName PostProject
 * @apiGroup Projects
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  name
 *
 * @apiSuccess  {String}    _id
 * @apiSuccess  {String}    name
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.post('/', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else if (!req.body.name) {
    next(new Errors.Generic('Name required', 400));
  } else {
    const project = new Project({
      name: req.body.name,
      owner: req.session.user._id,
    });
    project.subscribers.push(req.session.user._id);
    project.save()
      .then((newProject) => {
        res.body = newProject;
        next();
      })
      .catch(next);
  }
});

/**
 * @api {put} /projects/:projectId Update a project
 * @apiName PutProjectId
 * @apiGroup Projects
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  projectId
 * @apiParam  {String}  name
 *
 * @apiSuccess  {String}    _id
 * @apiSuccess  {String}    name
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.put('/:projectId', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Project.findById(req.params.projectId)
      .then((project) => {
        if (`${project.owner}` !== req.session.user._id) {
          return Promise.reject(new Errors.Unauthorized());
        }
        project.name = req.body.name || project.name;
        project.owner = req.body.owner || project.owner;
        return project.save();
      })
      .then((response) => {
        res.body = response;
        next();
      })
      .catch(next);
  }
});

/**
 * @api {delete} /projects/:projectId Delete a project
 * @apiName DeleteProjectId
 * @apiGroup Projects
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  projectId
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.delete('/:projectId', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Project.findById(req.params.projectId)
      .then((project) => {
        if (project.owner !== req.session.user._id) {
          return Promise.reject(new Errors.Unauthorized());
        }
        return project.remove();
      })
      .then(() => {
        res.status(204);
        next();
      })
      .catch(next);
  }
});

module.exports = router;

