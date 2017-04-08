const express = require('express');
const Ticket = require('../models').Ticket;
const Errors = require('../lib/errors');

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
  } else  {
    Ticket.findById(req.params.ticketId)
      .then((ticket) => {
        res.body = ticket;
        next();
      })
      .catch(next);
  }
});

module.exports = router;

