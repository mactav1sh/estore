import mongoose from 'mongoose';
import IProducts from '../interfaces/IProducts';

const productSchema = new mongoose.Schema<IProducts>(
  {
    sku: {
      type: String,
      required: [true, 'a product must have a sku'],
      unique: true,
      minlength: [8, 'sku must b 8 characters '],
      maxlength: [8, 'sku must be 8 characters '],
    },
    ownerID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      immutable: [true, `this field can't be modified `],
      required: [true, 'product must belong to a user'],
    },
    title: {
      type: String,
      maxlength: [20, 'title must be less than 30 characters'],
    },
    category: {
      type: String,
      // enum: {
      //   values: ['phone', ...],
      //   message: 'category is either: ...'
      // }
    },
    description: {
      type: String,
      required: [true, 'a product must have an email'],
      maxlength: [30, 'description must be less than 30 characters'],
    },
    price: {
      type: Number,
      required: [true, 'a product must have a price'],
    },
    onSale: {
      type: Boolean,
      minlength: [8, 'Password must be atleast 8 characters'],
      default: false,
    },
    salePrice: {
      type: Number,
      default: null,
    },
    reviewIDs: {
      type: [{ type: mongoose.Types.ObjectId, ref: 'Review' }],
      default: [], // Add default image,
    },
    availablePieces: {
      type: Number,
      default: 1,
    },
    imageUrl: String,
    // images: {
    //   type: [String],
    //   validate: [validateArrLength, 'max number of images is 5'],
    // },
    averageRating: {
      type: Number,
      default: 1,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val: number) => Math.round(val * 10) / 10,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// VALIDATORS
function validateArrLength(val: string[]) {
  return val.length <= 5;
}

const Product = mongoose.model('Product', productSchema);
export default Product;
