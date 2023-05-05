export interface Order {
  shippingDetails: {
    address: string;
    city: string;
    country: string;
    postalCode?: string;
  };
  paymentMethod: string;
  status: string;
  items: string[];
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}
