const express = require('express');
const { bidCreate, getHeigestBidInfo } = require('./bidInfo.controller');
const bidRouter = express.Router();

bidRouter.post('/create', bidCreate);

bidRouter.get('/max/:id', getHeigestBidInfo);

module.exports = bidRouter;