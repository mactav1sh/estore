import { FaTimes } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { IProduct } from '../../products';
import { useDeleteCartItem } from '../api/deleteCartItem';
interface Props {
  item: IProduct;
}

const CartListItem = ({ item }: Props) => {
  const { user } = useAuth();
  const { mutate, isSuccess, isLoading } = useDeleteCartItem(
    user?._id as string
  );

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
        disabled={isSuccess || isLoading}
        className="mr-2 rounded-full bg-slate-200 p-1 duration-200 hover:text-red-600 disabled:cursor-not-allowed disabled:text-gray-600"
        type="button"
        onClick={() =>
          mutate({
            userId: user?._id as string,
            productId: item._id,
          })
        }
      >
        <FaTimes
          className={`h-3 w-3 md:h-3.5 md:w-3.5 ${
            isLoading || isSuccess ? 'animate-spin' : ''
          }`}
        />
      </button>
    </li>
  );
};

export default CartListItem;
