const { FrontEndTopic } = require('../models/topicModel');

module.exports.getAllTopics = (req, res) => {
  const topics = {};
  res.status(200).json({
    status: 'success',
    data: {
      topics,
    },
  });
};

module.exports.createTopic = async (req, res) => {
  const topic = await FrontEndTopic.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      topic,
    },
  });
};

module.exports.updateTopic = (req, res) => {
  const data = req.body;
  res.status(200).json({
    status: 'success',
    data: data,
  });
};

module.exports.deleteTopic = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
