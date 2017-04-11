const express = require('express');
const basicAuth = require('basic-auth');
const models = require('../models');
const Errors = require('../lib/errors');

const Ticket = models.Ticket;
const Service = models.Service;
const router = express.Router({ mergeParams: true });

/**
 * @api {get} /tickets Get all tickets
 * @apiName GetTickets
 * @apiGroup Tickets
 * @apiVersion 0.1.0
 *
 * @apiSuccess  {Object[]}  tickets
 * @apiSuccess  {String}    tickets.service
 * @apiSuccess  {Date}      tickets.created
 * @apiSuccess  {Date}      tickets.updated
 * @apiSuccess  {Date}      tickets.completed
 * @apiSuccess  {Object}    tickets.details
 * @apiSuccess  {Object[]}  tickets.comments
 * @apiSuccess  {String}    tickets.comments.author
 * @apiSuccess  {String}    tickets.comments.body
 * @apiSuccess  {Date}      tickets.comments.created
 * @apiSuccess  {Date}      tickets.comments.updated
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
    if (req.body.service_id) {
      options.service = req.body.service_id;
    }

    Ticket.find(options)
      .then((tickets) => {
        res.body = tickets;
        next();
      })
      .catch(next);
  }
});

/**
 * @api {get} /tickets/:ticketId Get specific ticket
 * @apiName GetTicketById
 * @apiGroup Tickets
 * @apiVersion 0.1.0
 *
 * @apiParam    {String}    ticketId
 *
 * @apiSuccess  {String}    service
 * @apiSuccess  {Date}      created
 * @apiSuccess  {Date}      updated
 * @apiSuccess  {Date}      completed
 * @apiSuccess  {Object}    details
 * @apiSuccess  {Object[]}  comments
 * @apiSuccess  {String}    comments.author
 * @apiSuccess  {String}    comments.body
 * @apiSuccess  {Date}      comments.created
 * @apiSuccess  {Date}      comments.updated
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.get('/:ticketId', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Ticket.findById(req.params.ticketId)
      .then((ticket) => {
        res.body = ticket;
        next();
      })
      .catch(next);
  }
});

/**
 * @api {post} /tickets Create a ticket
 * @apiName PostTickets
 * @apiGroup Tickets
 * @apiVersion 0.1.0
 * @apiDescription Registered services will post errors information to this resource. All
 * parameters passed into the request body will be recorded.
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission service
 */
router.post('/', (req, res, next) => {
  const credentials = basicAuth(req);
  if (!credentials || !credentials.name || !credentials.pass) {
    next(new Errors.Unauthorized());
  } else {
    Service.findById(credentials.name)
      .then(service => service.authorize(credentials.pass))
      .then(() => {
        const currentTime = new Date();
        const ticket = new Ticket({
          created: currentTime,
          updated: currentTime,
          service: credentials.name,
          details: req.body,
        });
        return ticket.save();
      })
      .then((ticket) => {
        res.body = ticket;
        next();
      })
      .catch(next);
  }
});


/**
 * @api {post} /tickets/:ticketId Close a ticket
 * @apiName PostTicketsId
 * @apiGroup Tickets
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  ticketId
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.post('/:ticketId', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Ticket.findById(req.params.ticketId)
      .then((ticket) => {
        ticket.completed = new Date();
        return ticket.save();
      })
      .then(() => {
        res.status(204);
        next();
      })
      .catch(next);
  }
});

/**
 * @api {delete} /tickets/:ticketId Delete a ticket
 * @apiName DeleteTicketsId
 * @apiGroup Tickets
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  ticketId
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.delete('/:ticketId', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Ticket.findById(req.params.ticketId)
      .then(ticket => ticket.remove())
      .then(() => {
        res.status(204);
        next();
      })
      .catch(next);
  }
});

/**
 * @api {get} /tickets/:ticketId/comments Get all ticket comments
 * @apiName GetTicketsIdComment
 * @apiGroup Tickets
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  ticketId
 *
 * @apiSuccess  {Object[]}
 * @apiSuccess  {String}  _id     Comment ID
 * @apiSuccess  {String}  body    Comment contents
 * @apiSuccess  {Date}    created Creation time
 * @apiSuccess  {Date}    updated Update time
 * @apiSuccess  {String}  author  Comment's author
 *
 * @apiUse UnauthorizedError
 */
router.get('/:ticketId/comments', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Ticket.findById(req.params.ticketId)
      .populate(['comments.author'])
      .then((ticket) => {
        res.body = ticket.comments;
        next();
      })
      .catch(next);
  }
});

/**
 * @api {post} /tickets/:ticketId/comments Comment on a ticket
 * @apiName PostTicketsIdComment
 * @apiGroup Tickets
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  ticketId  ID of the ticket
 * @apiParam  {String}  message   Message contents for comment
 *
 * @apiSuccess  {String}  _id     Comment ID
 * @apiSuccess  {String}  body    Comment contents
 * @apiSuccess  {Date}    created Creation time
 * @apiSuccess  {Date}    updated Update time
 * @apiSuccess  {String}  author  Comment's author
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.post('/:ticketId/comments', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else if (!req.body.message) {
    next(new Errors.Generic('Message required', 400));
  } else {
    Ticket.findById(req.params.ticketId)
      .then((ticket) => {
        const comment = {
          author: req.session.user._id,
          body: req.body.message,
        };
        ticket.comments.push(comment);
        return ticket.save()
          .then(() => Promise.resolve(ticket.comments.pop()));
      })
      .then((comment) => {
        res.body = comment;
        next();
      })
      .catch(next);
  }
});

/**
 * @api {put} /tickets/:ticketId/comments/:commentId Update a ticket comment
 * @apiName PutTicketsIdCommentId
 * @apiGroup Tickets
 * @apiVersion 0.1.0
 *
 * @apiParam  {String}  ticketId  ID of the ticket
 * @apiParam  {String}  commentId ID of the comment
 * @apiParam  {String}  message   Message contents for comment
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */
router.put('/:ticketId/comments/:commentId', (req, res, next) => {
  if (!req.session.user) {
    next(new Errors.Unauthorized());
  } else {
    Ticket.findById(req.params.ticketId)
      .then((ticket) => {
        const comment = ticket.comments.id(req.params.commentId);
        if (!comment || comment.author.toString() !== req.session.user._id) {
          return Promise.reject(new Errors.Unauthorized());
        }
        comment.body = req.body.message;
        return comment.save();
      })
      .then((comment) => {
        res.body = comment;
        next();
      })
      .catch(next);
  }
});

/**
 * @api {delete} /tickets/:ticketId/comments/:commentId Delete a ticket comment
 * @apiName DeleteTicketsIdCommentId
 * @apiGroup Ticket
 * @apiVersion 0.1.0
 *
 * @apiUse UnauthorizedError
 *
 * @apiPermission user
 */

module.exports = router;

