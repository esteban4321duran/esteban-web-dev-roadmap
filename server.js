const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

//connect to DB

//start server
const port = process.env.PORT || 8000;

app.listen(port, () => {});
