import { IProduct } from '../../products';
export interface ICart {
  _id: string;
  userID: string;
  itemsList: IProduct[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
