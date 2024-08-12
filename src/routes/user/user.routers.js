const express = require('express');
const { userRegister, userLogin, adminLogin, getAllUsers, getUserById, updateUser, deleteUser } = require('./user.controller');
const { authenticateToken } = require('../../middlewares/authMiddleware');
const userRouter = express.Router();

// Public Routes
userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/admin/login', adminLogin);

// Protected Routes
userRouter.get('/', authenticateToken, getAllUsers);
userRouter.get('/:id', authenticateToken, getUserById);
userRouter.put('/:id', authenticateToken, updateUser);
userRouter.delete('/:id', authenticateToken, deleteUser);

module.exports = userRouter;