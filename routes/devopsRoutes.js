const express = require('express');
const devopsController = require('../controllers/devopsController');

const router = express.Router();

router
  .route('/')
  .get(devopsController.getAllTopics)
  .post(devopsController.createTopic);

router
  .route('/:id')
  .patch(devopsController.updateTopic)
  .delete(devopsController.deleteTopic);

module.exports = router;
