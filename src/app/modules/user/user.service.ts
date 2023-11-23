import { TUser } from './user.interface';
import { UserModel } from './user.model';

// get all users
async function getUsersFromDB() {
  return await UserModel.find({},{_id:false,username: true, fullName: true, age:true, email: true,address:true});
}

// create new user
async function createUserIntoDB(userData: TUser) {
  return await UserModel.create(userData);
}

export default { getUsersFromDB, createUserIntoDB };
