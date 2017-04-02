const crypto = require('crypto');
const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const Service = new Schema({
  name: {
    type: String,
    required: true,
  },
  environment: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

Service.methods.generateSecret = function generateSecret() {
  this.secret = crypto.randomBytes(32).toString('base64');
  return this.secret;
};

Service.pre('save', (next) => {
  if (!this.secret) {
    this.generateSecret();
  }
  next();
});

module.exports = mongoose.model('Service', Service);

