import mongoose from 'mongoose';

export interface IReview {
  id?: string;
  review: string;
  rating: number;
  productID: mongoose.Types.ObjectId | undefined;
  userID: mongoose.Types.ObjectId | undefined;
}
