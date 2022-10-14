import mongoose from 'mongoose';
import IProducts from '../interfaces/IProducts';

// Create controller
// Create Router

const productsSchema = new mongoose.Schema<IProducts>(
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
      type: [mongoose.Types.ObjectId],
      default: [], // Add default image,
      // ref: TODO: Implement ref pointing to Reviews,
    },
    availablePieces: {
      type: Number,
      default: 1,
    },
    images: {
      type: [String],
      validate: [validateArrLength, 'max number of images is 5'],
    },
  },
  { timestamps: true }
);

// VALIDATORS
function validateArrLength(val: string[]) {
  return val.length <= 5;
}

// TODO: Populate fields

const Product = mongoose.model('Product', productsSchema);
export default Product;
