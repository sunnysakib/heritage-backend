const express = require('express');
const { userRegister, userLogin, adminLogin, getAllUsers, getUserById, updateUser, deleteUser } = require('./user.controller');
const userRouter = express.Router();

userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);
userRouter.post('/admin/login', adminLogin);

userRouter.get('/',  getAllUsers);
userRouter.get('/:id',  getUserById);
userRouter.put('/:id',  updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;