const express = require('express');
const apiRouter = express.Router();

const salesRouter = require('./sales');

apiRouter.use('/sales', salesRouter);

module.exports = apiRouter;