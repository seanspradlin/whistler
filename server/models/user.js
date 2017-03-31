const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: String,
  googleId: String,
});

module.exports = mongoose.model('User', User);

