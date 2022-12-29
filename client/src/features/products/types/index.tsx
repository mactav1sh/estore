export interface Product {
  _id: string;
  ownerID: string;
  imageUrl: string;
  description: string;
  category: string;
  title: string;
  onSale: boolean;
  price: number;
  salePrice?: number;
  reviewIDs: string[];
  averageRating: number;
  numberOfRatings: number;
  createdAt: string;
  updatedAt: string;
}
