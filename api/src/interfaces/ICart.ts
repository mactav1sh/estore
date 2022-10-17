import mongoose from 'mongoose';

export interface ICart {
  userID: mongoose.Types.ObjectId | undefined;
  items: (mongoose.Types.ObjectId | undefined)[];
  totalPrice: number;
}
