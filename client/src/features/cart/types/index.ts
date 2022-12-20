import { Product } from '../../products';
export interface Cart {
  _id: string;
  userID: string;
  itemsList: Product[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
