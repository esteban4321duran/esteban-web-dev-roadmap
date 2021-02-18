const express = require('express');
const backEndController = require('../controllers/backEndController');

const router = express.Router();

router
  .route('/')
  .get(backEndController.getAllTopics)
  .post(backEndController.createTopic);

router
  .route('/:id')
  .patch(backEndController.updateTopic)
  .delete(backEndController.deleteTopic);

module.exports = router;
