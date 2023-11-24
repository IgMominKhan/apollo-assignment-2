import { Request, Response } from 'express';
import __userService from './user.service';
import userValidationSchema from './uesr.validation';
import { User } from './user.model';

// path : /api/user
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

    // @ts-ignore
    const isExist = await User.isExists(Number(userId));

    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const data = await __userService.getSingleUserFromDb(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error,
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

export default { getUsers, createUser, getSingleUser };
