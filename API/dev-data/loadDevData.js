const mongoose = require('mongoose');
const DevDataLoader = require('./DevDataLoader');
const {
  FrontEndTopic,
  BackEndTopic,
  DevopsTopic,
} = require('../models/topicModel');

mongoose
  .connect(
    'mongodb+srv://esteban321duran:<password>@cluster0.az01c.mongodb.net/webDev?retryWrites=true&w=majority'.replace(
      '<password>',
      'rvFEDqlb86Np45Qi'
    ),
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .catch((error) => console.error(error));

const frontEndLoader = new DevDataLoader(FrontEndTopic);
const backEndLoader = new DevDataLoader(BackEndTopic);
const devopsLoader = new DevDataLoader(DevopsTopic);

frontEndLoader.load(`${__dirname}/front-end-topics.json`);
backEndLoader.load(`${__dirname}/back-end-topics.json`);
devopsLoader.load(`${__dirname}/devops-topics.json`);
