import { Link } from 'react-router-dom';
import CartList from '../components/CartList';
import useAuth from '../../../hooks/useAuth';
import { useGetCart } from '../api/getCart';
import Spinner from '../../../components/elements/Spinner';
import { calcProductCost } from '../../../utils/calcCost';

const Cart = () => {
  const { user } = useAuth();
  const additionalCost = {
    taxes: 20,
    shipping: 35,
  };

  const { data, isLoading } = useGetCart(user?._id as string);

  if (isLoading) return <Spinner />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200 px-2">
      {/* MAIN CONTENT */}
      <div className="flex w-full max-w-4xl flex-col space-y-7 rounded-md bg-white p-6 md:flex-row md:justify-between md:space-y-0 md:space-x-16">
        {/* - cart items - left side */}
        <div className="flex-[2]">
          {/* -- title */}
          <h2 className="mb-10 text-xl font-semibold uppercase">
            my cart ({data.cart.itemsList.length})
          </h2>
          {/* -- products list */}
          <CartList items={data.cart.itemsList} />
        </div>
        {/* - prices - right side */}
        <div className="h-fit flex-[1] rounded-md border border-gray-200 py-4 md:self-center">
          {/* -- title */}
          <h2 className="mb-6 text-center font-semibold tracking-wide">
            Summary
          </h2>
          {/* -- prices */}
          <div className="px-6">
            {/* --- subtotal */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal.</span>
              {/* <span>{cartData.itemsList.reduce((cur, item) => item)}$</span> */}
              <span>{calcProductCost(data.cart.itemsList)}$</span>
            </div>
            {/* --- shipping */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">Shipping Est.</span>
              <span>{additionalCost.shipping}$</span>
            </div>
            {/* --- taxes */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Taxes.</span>
              <span>{additionalCost.taxes}$</span>
            </div>
            {/* --- divider */}
            <div className="my-4 mx-auto h-[0.1rem] w-1/3 bg-gray-200"></div>
            {/* --- total price */}
            <div className="mb-4 flex items-center justify-between">
              <span className="">Total Price.</span>
              <span className="font-semibold">
                {calcProductCost(data.cart.itemsList) +
                  additionalCost.shipping +
                  additionalCost.taxes}
                $
              </span>
            </div>
            {/* --- checkout link */}
            <Link
              to="/"
              className="flex items-center justify-between bg-pink-600 py-2 duration-200 hover:bg-pink-700"
            >
              <p className="w-full text-center text-sm capitalize text-white">
                proceed to checkout
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
