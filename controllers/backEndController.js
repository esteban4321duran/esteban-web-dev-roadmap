const { BackEndTopic } = require('../models/topicModel');

module.exports.getAllTopics = async (req, res) => {
  try {
    const topics = await BackEndTopic.find();
    res.status(200).json({
      status: 'success',
      data: {
        topics,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      data: {
        message: error.message,
      },
    });
  }
};

module.exports.createTopic = async (req, res) => {
  try {
    const topic = await BackEndTopic.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        topic,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      data: {
        message: error.message,
      },
    });
  }
};

module.exports.updateTopic = async (req, res) => {
  try {
    const topic = await BackEndTopic.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: topic,
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      data: {
        message: error.message,
      },
    });
  }
};

module.exports.deleteTopic = async (req, res) => {
  try {
    await BackEndTopic.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      data: {
        message: error.message,
      },
    });
  }
};
