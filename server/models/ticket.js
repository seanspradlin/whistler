const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created: Date,
  updated: Date,
  body: String,
});

Comment.pre('save', (next) => {
  if (!this.created) {
    this.created = new Date();
  }
  this.updated = new Date();
  next();
});

const Ticket = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
  },
  comments: [Comment],
  created: Date,
  updated: Date,
  details: Schema.Types.Mixed,
});

Ticket.pre('save', (next) => {
  if (!this.created) {
    this.created = new Date();
  }
  this.updated = new Date();
  next();
});

module.exports = mongoose.model('Ticket', Ticket);

