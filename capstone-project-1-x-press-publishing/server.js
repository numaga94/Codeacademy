const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const cors = require('cors');
const apiRouter = require('./api/api');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(errorhandler());

// mount all routers from director ./api/api.js
app.use('/api', apiRouter);

// LISTEN on PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  `Server is listening on port ${PORT}`;
});

module.exports = app;
