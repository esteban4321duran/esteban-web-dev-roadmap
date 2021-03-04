const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const frontEndRouter = require('./routes/frontEndRoutes');
const backEndRouter = require('./routes/backEndRoutes');
const devopsRouter = require('./routes/devopsRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/front-end', frontEndRouter);
app.use('/api/back-end', backEndRouter);
app.use('/api/devops', devopsRouter);

module.exports = app;
