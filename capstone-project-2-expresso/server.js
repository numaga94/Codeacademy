const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const apiRouter = require('./api/api');

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(errorhandler());

// mount api modules
app.use('/api', apiRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
