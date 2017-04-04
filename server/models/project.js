const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const Project = new Schema({
  name: {
    type: String,
    required: true,
  },
  processes: [{
    type: Schema.Types.ObjectId,
    ref: 'Service',
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subscribers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Project', Project);

