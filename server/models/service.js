const Promise = require('bluebird');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Errors = require('../lib/errors');
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
  secret: String,
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

Service.methods.updateSecret = function updateSecret() {
  return new Promise((resolve, reject) => {
    const secret = crypto.randomBytes(32).toString('base64');
    this.secret = bcrypt.hash(secret, 10, (error, hash) => {
      if (error) {
        reject(error);
      } else {
        this.secret = hash;
        resolve(secret);
      }
    });
  });
};

Service.methods.authorize = function authorize(password) {
  const hash = this.secret;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) {
        reject(err);
      } else if (!match) {
        reject(new Errors.Unauthorized());
      } else {
        resolve();
      }
    });
  });
};

module.exports = mongoose.model('Service', Service);

