import express from 'express';
import __userController from './user.controller';

export const userRoute = express.Router();

// get all users route
userRoute.get('/', __userController.getUsers);

// get single user
userRoute.get("/:userId", __userController.getSingleUser)
// create user route
userRoute.post('/', __userController.createUser);

//