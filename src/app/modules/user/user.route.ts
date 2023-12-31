import express from 'express';
import __userController from './user.controller';

export const userRoute = express.Router();

// get all users route
userRoute.get('/', __userController.getUsers);

// get single user
userRoute.get('/:userId', __userController.getSingleUser);

// create user route
userRoute.post('/', __userController.createUser);

// update a single user
userRoute.put('/:userId', __userController.updateUser);

// delete an user
userRoute.delete('/:userId', __userController.deleteUser);

// get order of an user
userRoute.get('/:userId/orders', __userController.getOrders);

// add a new order
userRoute.put('/:userId/orders', __userController.addAnOrder);

// total price of specific user
userRoute.get(
  '/:userId/orders/total-price',
  __userController.totalPriceOfOrders,
);
