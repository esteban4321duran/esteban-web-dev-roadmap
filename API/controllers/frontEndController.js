const { FrontEndTopic } = require('../models/topicModel');

module.exports.getAllTopics = async (req, res) => {
  try {
    const topics = await FrontEndTopic.find();
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
    const topic = await FrontEndTopic.create(req.body);
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
  console.log(req.body);
  try {
    const topic = await FrontEndTopic.findByIdAndUpdate(
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
    await FrontEndTopic.findByIdAndDelete(req.params.id);
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
