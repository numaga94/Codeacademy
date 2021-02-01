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

// Mount api router
app.use('/api', apiRouter);

// PORT
const PORT = process.env.PORT || 3000;

// listen
app.listen(PORT, () => {
  `Server is listening on port ${PORT}`;
});
