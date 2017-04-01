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
  subscribers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Service', Service);

