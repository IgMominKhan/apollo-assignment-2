import { model, Schema } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser } from './user.interface';

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

const orderSchema = new Schema<TOrder>({
  productName: String,
  price: Number,
  quantity: Number,
});

const userSchema = new Schema<TUser>(
  {
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
  },
  {
    statics: {
      async isExists(userId) {
        return !!(await this.exists({ userId }));
      },
    },
  },
);

// middlewares
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = model('User', userSchema);
