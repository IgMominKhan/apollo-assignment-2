import { Request, Response } from 'express';
import __userService from './user.service';
import userValidationSchema from './uesr.validation';
import { User } from './user.model';
import { isAscii } from 'buffer';

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

    if (isNaN(Number(userId))) {throw new Error('User id must be a positive number');}

    const isExist = await User.isExists(+userId);

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

    if (isNaN(Number(userId))) {throw new Error('User id must be a positive number');}

    const isExist = await User.isUserExist(Number(userId));

    if (isExist) {
      const validatedUserData = userValidationSchema.parse(req.body);

      const data = await __userService.updateUserIntoDB(
        Number(userId),
        validatedUserData,
      );

      res.status(200).json({
        success: true,
        message: 'Successfully updated user information',
        data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error:error?.message,
    });
  }
}

// method : DELETE
// path : /api/users/:userId
async function deleteUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (!isNaN(Number(userId))) {
      const isExist = await User.isUserExist(+userId);
      if (isExist) {
        const data = await __userService.deleteUser(+userId);
        if (data.deletedCount) {
          res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: null,
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found',
          },
        });
      }
    } else throw new Error('User id must be a positive number');
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error?.message,
    });
  }
}

export default { getUsers, createUser, getSingleUser, updateUser, deleteUser };
