const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Subtopics must have content\n'],
    trim: true,
  },
  status: {
    type: String,
    default: 'pending',
    trim: true,
  },
  type: {
    type: String,
    default: 'recommended',
    trim: true,
  },
});

module.exports = subtopicSchema;
