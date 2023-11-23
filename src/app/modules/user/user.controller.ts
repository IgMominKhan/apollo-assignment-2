import { Request, Response } from 'express';
import __userService from './user.service';
import userValidationSchema from './uesr.validation';

// path : /api/user
// method : get
async function getUsers(req: Request, res: Response) {
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

// path : /api/users
// method : POST
async function createUser(req: Request, res: Request) {
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

export default { getUsers, createUser };
