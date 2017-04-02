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
  subscribers: [{
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }],
});

module.exports = mongoose.model('Project', Project);

