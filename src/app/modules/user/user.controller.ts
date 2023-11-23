import { Request, Response } from 'express';
import __userService from './user.service';

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

function createStudent(req: Request, res: Request) {
  const userData = req.body?.student;

  return userData;
}

export default { getUsers, createStudent };
