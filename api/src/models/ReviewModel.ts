import mongoose from 'mongoose';
import { IReview } from '../interfaces/IReview';
import Product from './ProductsModel';

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

// This post save middleware calculates average rating and number of ratings of the given products then updates the product document each review update
reviewSchema.post('save', async function () {
  const stats = await Review.aggregate([
    {
      $match: { productID: this.productID },
    },
    {
      $group: {
        _id: '$productID',
        numOfRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(this.productID, {
      numberOfRatings: stats[0].numOfRatings,
      averageRating: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(this.productID, {
      numberOfRatings: 0,
      averageRating: 0,
    });
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
