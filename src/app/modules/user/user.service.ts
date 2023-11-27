import { TOrder, TUser } from './user.interface';
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
    runValidators: true,
  }).select({ _id: 0, orders: 0 });
  return updatedData;
}

// delete user
async function deleteUser(userId: number) {
  const data = await User.deleteOne({ userId });
  return data;
}

// get order of an user
async function getOrders(userId: number) {
  const result = await User.findOne({ userId }, { orders: 1, _id: 0 });
  return result;
}

// add new order
async function addNewOrderIntoDB(userId: number, order: TOrder) {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: order } },
    { upsert: true, runValidators: true },
  );
  return result;
}

// get the total price of an user
async function totalPriceOfOrders(userId: number) {
  const result = await User.aggregate([
    {
      $match: { userId },
    },
    {
      $project: { orders: 1 },
    },
    {
      $unwind: '$orders',
    },
    {
      $project: {
        totalPerOrder: {
          $multiply: ['$orders.price', '$orders.quantity'],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: '$totalPerOrder',
        },
      },
    },
    {
      $unset: '_id',
    },
  ]);

  return result;
}

export default {
  getUsersFromDB,
  createUserIntoDB,
  getSingleUserFromDb,
  updateUserIntoDB,
  deleteUser,
  addNewOrderIntoDB,
  getOrders,
  totalPriceOfOrders,
};
