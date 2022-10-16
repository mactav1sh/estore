import mongoose from 'mongoose';

export interface IOrder {
  userID: mongoose.Types.ObjectId | undefined;
  items: { quantity: number; product: mongoose.Types.ObjectId[] | undefined };
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  status: string;
  shippingDetails: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}
