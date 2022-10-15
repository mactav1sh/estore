import mongoose from 'mongoose';
import { IReview } from '../interfaces/IReview';

const reviewSchema = new mongoose.Schema<IReview>(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    productID: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product'],
    },

    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  { timestamps: true }
);

// allowing a user to have only one review on each product
reviewSchema.index({ productID: 1, userID: 1 }, { unique: true });

// reviewSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//     select: 'name',
//   });
//   next();
// });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
