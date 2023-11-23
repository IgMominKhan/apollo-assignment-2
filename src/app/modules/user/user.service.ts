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

// create new user
async function createUserIntoDB(userData: TUser) {
  return await User.create(userData);
}

export default { getUsersFromDB, createUserIntoDB };
