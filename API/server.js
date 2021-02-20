const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

//connect to DB
mongoose
  .connect(
    process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD),
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true }
  )
  .catch((error) => console.error(error));
//start server
const port = process.env.PORT || 8000;

app.listen(port, () => {});
