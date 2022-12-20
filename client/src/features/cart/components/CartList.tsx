import React from 'react';
import { Product } from '../../products/types';
import CartListItem from './CartListItem';

interface Props {
  items: Product[];
}
const CartList = ({ items }: Props) => {
  return (
    <ul className="hide-scroll flex max-h-72 flex-col space-y-3 overflow-y-scroll md:h-72">
      {items.map((item) => (
        <CartListItem item={item} key={item._id} />
      ))}
    </ul>
  );
};

export default CartList;
