import { useNavigate } from 'react-router-dom';
import CartList from '../components/CartList';
import useAuth from '../../../hooks/useAuth';
import { useGetCart } from '../api/getCart';
import { Spinner } from '../../../components';
import { calcProductCost } from '../../../utils';

export const Cart = () => {
  const { user } = useAuth();
  const additionalCost = {
    taxPercentage: 0.2,
    shippingPercentage: 0.3,
  };
  const navigate = useNavigate();

  const { data, isLoading } = useGetCart(user?._id as string);

  if (isLoading) return <Spinner />;
  const { totalCost, cost, taxes, shippingCost } = calcProductCost(
    data.cart.itemsList,
    additionalCost.taxPercentage,
    additionalCost.shippingPercentage
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-2">
      {/* MAIN CONTENT */}
      <div className="flex w-full max-w-4xl flex-col space-y-7 rounded-md border bg-white p-6 shadow-md md:flex-row md:justify-between md:space-y-0 md:space-x-16">
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
              <span>{cost}$</span>
            </div>
            {/* --- shipping */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">Shipping Est.</span>
              <span>{shippingCost}$</span>
            </div>
            {/* --- taxes */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Taxes.</span>
              <span>{taxes}$</span>
            </div>
            {/* --- divider */}
            <div className="my-4 mx-auto h-[0.1rem] w-1/3 bg-gray-200"></div>
            {/* --- total price */}
            <div className="mb-4 flex items-center justify-between">
              <span className="">Total Price.</span>
              <span className="font-semibold">
                {totalCost}
                {}$
              </span>
            </div>
            {/* --- checkout link */}
            <button
              className="flex w-full items-center justify-between rounded-md bg-brand-pink-600 py-2 font-semibold duration-200 hover:bg-brand-pink-500 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-slate-500"
              onClick={() =>
                navigate('/order', {
                  state: {
                    cost,
                    totalCost,
                    taxes,
                    shippingCost,
                    itemsList: data.cart.itemsList,
                  },
                })
              }
              disabled={data.cart.itemsList?.length === 0}
            >
              <p className="w-full text-center text-sm capitalize text-white">
                proceed to checkout
              </p>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
