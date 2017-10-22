const mongoose = require('../lib/mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: String,
  password: String,
  googleId: String,
  picture: String,
  isAdmin: Boolean,
});

User.static('generateHash', password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));

User.method('validPassword', function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
});

module.exports = mongoose.model('User', User);

