import mongoose from 'mongoose';

export interface ICart {
  userID: mongoose.Types.ObjectId | undefined;
  itemsList: (mongoose.Types.ObjectId | undefined)[];
  totalPrice: number;
}
