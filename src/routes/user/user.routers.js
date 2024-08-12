const express = require('express');
const { userRegister } = require('./user.controller');

const userRouter = express.Router();

// Public Routes
userRouter.post('/register', userRegister);

module.exports = userRouter;