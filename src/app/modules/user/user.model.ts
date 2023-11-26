import { model, Schema } from 'mongoose';
import {
  IUserModel,
  TAddress,
  TFullName,
  TOrder,
  TUser,
} from './user.interface';

const fullNameSchema = new Schema<TFullName>(
  {
    firstName: String,
    lastName: String,
  },
  { _id: false },
);

const addressSchema = new Schema<TAddress>(
  {
    street: String,
    city: String,
    country: String,
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema<TOrder>(
  {
    productName: String,
    price: Number,
    quantity: Number,
  },
  { _id: false },
);

const userSchema = new Schema<TUser, IUserModel>({
  userId: {
    type: Number,
    unique: true,
  },

  username: {
    type: String,
    unique: true,
  },
  password: String,
  fullName: fullNameSchema,
  age: Number,
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    default: undefined,
  },
  address: addressSchema,
  orders: {
    type: [orderSchema],
    default: undefined,
  },
});

// middlewares
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// typed static method
userSchema.static(
  'isUserExist',
  async function isUserExist(userId: number, res: Response) {
    const isExist = !!(await this.exists({ userId }));

    if (isExist) {
      return isExist;
    } else {
      // @ts-expect-error
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }
  },
);

export const User = model<TUser, IUserModel>('User', userSchema);
