import { Model } from 'mongoose';
import { promises } from 'dns';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};
export type TUser = {
  userId: number;
  username: string;
  password?: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>;
  address: TAddress;
  orders?: Array<TOrder>;
};

// model interface
export interface IUserModel extends Model<TUser> {
  isUserExist(userId: string): unknown;
}
