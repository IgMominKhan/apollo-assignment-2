import { Request, Response } from 'express';
import __userService from './user.service';
import userValidationSchema, { orderValidationSchema } from './uesr.validation';
import { User } from './user.model';

// path : /api/users
// method : get
async function getUsers(_req: Request, res: Response) {
  try {
    const users = await __userService.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users data',
      error,
    });
  }
}

// path : /api/users/:userId
// method : GET
async function getSingleUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (isNaN(Number(userId))) {
      throw new Error('User id must be a positive number');
    }

    // @ts-expect-error
    const isExist = User.isUserExist(+userId, res);

    const data = await __userService.getSingleUserFromDb(+userId);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      // @ts-expect-error
      error: error?.message,
    });
  }
}

// path : /api/users
// method : POST
async function createUser(req: Request, res: Response) {
  try {
    const validatedUserData = userValidationSchema.parse(req.body);
    const data = await __userService.createUserIntoDB(validatedUserData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'failed to create an user',
      error,
    });
  }
}

// method : PUT
// path : /api/users/:userId
async function updateUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (isNaN(Number(userId))) {
      throw new Error('User id must be a positive number');
    }

    const validatedUserData = userValidationSchema.parse(req.body);

    // @ts-expect-error
    const isExist = User.isUserExist(+userId, res);

    const data = await __userService.updateUserIntoDB(
      +userId,
      validatedUserData,
    );

    res.status(200).json({
      success: true,
      message: 'Successfully updated user information',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      // @ts-expect-error
      error: error?.message,
    });
  }
}

// method : DELETE
// path : /api/users/:userId
async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (isNaN(+userId)) throw new Error('User Id must be a positive number');

    // @ts-expect-error
    const isExist = User.isUserExist(+userId, res);

    const data = await __userService.deleteUser(+userId);
    if (data.deletedCount) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      // @ts-expect-error
      error: error?.message,
    });
  }
}

// method : GET
// path : /api/users/:userId/orders
async function getOrders(req:Request,res:Response){
  const {userId} = req.params

  if(isNaN(+userId)) throw new Error("User Id must be a positive number")

  // @ts-expect-error ignore res parameter ts error
  const isExist = User.isUserExist(+userId,res)

  const data = await __userService.getOrders(+userId);
  res.status(200).json({
    success:true,
    message:"Order fetched successfully!",
    data
  })
}

// method : PUT
// path : /api/users/:userId/orders
async function addAnOrder(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (isNaN(+userId)) throw new Error('User Id must be a positive number');

    // @ts-expect-error
    const isExist = User.isUserExist(+userId, res);

    const validatedOrderData = orderValidationSchema.parse(req.body);

    const data = await __userService.addNewOrderIntoDB(
      +userId,
      validatedOrderData,
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add order',
      // @ts-expect-error
      error: error?.message,
    });
  }
}

export default {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getOrders,
  addAnOrder,
};
