const express = require('express');
const menuRouter = require('./menus');
const employeeRouter = require('./employees');
const apiRouter = express.Router();

// mount employees router
apiRouter.use('/employees', employeeRouter);
apiRouter.use('/menus', menuRouter);

module.exports = apiRouter;
