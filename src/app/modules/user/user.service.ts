import { TUser } from './user.interface';
import { User } from './user.model';

// get all users
function getUsersFromDB() {
  return User.find(
    {},
    {
      _id: false,
      username: true,
      fullName: true,
      age: true,
      email: true,
      address: true,
    },
  );
}

// get single user from db
function getSingleUserFromDb(userId: number) {
  return User.findOne({ userId }, { _id: false, orders: false });
}

// create new user
async function createUserIntoDB(userData: TUser) {
  return await User.create(userData);
}

// update user
async function updateUserIntoDB(userId: number, userData: TUser) {
  const updatedData = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
  }).select({ _id: 0, orders: 0 });
  return updatedData;
}

// delete user
async function deleteUser(userId: number) {
  const data = await User.deleteOne({ userId });
  return data;
}

export default {
  getUsersFromDB,
  createUserIntoDB,
  getSingleUserFromDb,
  updateUserIntoDB,
  deleteUser,
};
