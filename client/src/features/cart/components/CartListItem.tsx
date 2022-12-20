import { FaTimes } from 'react-icons/fa';
import { Product } from '../../products';
interface Props {
  item: Product;
}

const CartListItem = ({ item }: Props) => {
  return (
    <li className="flex w-full items-center justify-around border-b pb-3 font-medium last:border-none">
      <div className="mr-3 flex flex-[2] items-center space-x-2">
        <img src={item.imageUrl} alt={item.title} className="w-10 rounded-md" />
        <p className="truncate">{item.title}</p>
      </div>
      <span className="flex-[1]">
        {' '}
        {item.onSale ? item.salePrice : item.price}$
      </span>
      <button
        className="mr-2 rounded-full bg-slate-200 p-1 duration-200 hover:text-red-600"
        type="button"
      >
        <FaTimes className="h-3 w-3 md:h-3.5 md:w-3.5" />
      </button>
    </li>
  );
};

export default CartListItem;
