const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;
const schema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
  },
  comments: [{
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    created: Date,
    updated: Date,
    body: String,
  }],
  created: Date,
  updated: Date,
  details: Schema.Types.Mixed,
});

schema.pre('save', (next) => {
  if (!this.created) {
    this.created = new Date();
  }
  this.updated = new Date();
  next();
});

module.exports = mongoose.model('Ticket', schema);

