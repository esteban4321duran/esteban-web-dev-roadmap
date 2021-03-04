const mongoose = require('mongoose');
const subtopicSchema = require('./subtopicModel.js');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Topics must have a name\n'],
    unique: true,
    trim: true,
  },
  status: {
    type: String,
    default: 'pending',
    trim: true,
  },
  order: {
    type: Number,
    required: [true, 'Topics must have an order\n'],
  },
  subtopics: {
    type: [subtopicSchema],
  },
});

const FrontEndTopic = mongoose.model('FrontEndTopic', topicSchema, 'front-end');
const BackEndTopic = mongoose.model('BackEndTopic', topicSchema, 'back-end');
const DevopsTopic = mongoose.model('DevopsTopic', topicSchema, 'devops');

module.exports.FrontEndTopic = FrontEndTopic;
module.exports.BackEndTopic = BackEndTopic;
module.exports.DevopsTopic = DevopsTopic;
