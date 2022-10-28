import mongoose from 'mongoose';
import { ICart } from '../interfaces/ICart';

const cartSchema = new mongoose.Schema<ICart>(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'order must belong to a user'],
      // each user can have only one cart
      unique: true,
    },

    itemsList: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
      },
    ],

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
