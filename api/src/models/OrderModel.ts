import mongoose from 'mongoose';
import { IOrder } from '../interfaces/IOrder';

const orderSchema = new mongoose.Schema<IOrder>(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'order must belong to a user'],
    },
    status: {
      type: String,
      enum: {
        values: ['confirmed', 'shipped', 'delivered'],
        message: 'status is either: "confirmed", "shipped", or "delivered"',
      },
      required: [true, 'order must have a status'],
    },

    items: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
      },
    ],

    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    shippingDetails: {
      type: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String },
      },
      required: true,
      _id: false,
    },

    paymentMethod: {
      type: String,
      enum: {
        values: ['cashOnDelivery', 'debitCard', 'bankTransfer'],
        message:
          'paymentMethod is either: "cashOnDelivery", "debitCard", or "bankTransfer"',
      },
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
