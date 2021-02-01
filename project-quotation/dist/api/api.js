const e = require('express');
const express = require('express');
const quoteRouter = require('./quotes');
const apiRouter = express.Router();

// mount quotes router
apiRouter.use('/quotes', quoteRouter);

module.exports = apiRouter;
