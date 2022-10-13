import mongoose from 'mongoose';

export interface IProducts {
  id?: string;
  sku: string;
  owner: mongoose.Types.ObjectId | undefined;
  title: string;
  description: string;
  category: string;
  price: number;
  onSale: boolean;
  salePrice: number;
  reviewIDs: mongoose.Types.ObjectId[];
  availablePieces: number;
  image: string[];
}

export default IProducts;
