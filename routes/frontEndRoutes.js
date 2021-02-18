const express = require('express');
const frontEndController = require('../controllers/frontEndController');

const router = express.Router();

router
  .route('/')
  .get(frontEndController.getAllTopics)
  .post(frontEndController.createTopic);

router
  .route('/:id')
  .patch(frontEndController.updateTopic)
  .delete(frontEndController.deleteTopic);

module.exports = router;
