import express from 'express';
import __userController from './user.controller';

export const userRoute = express.Router();

// get all users route
userRoute.get('/', __userController.getUsers);

// create user route
userRoute.post('/', __userController.createStudent);
