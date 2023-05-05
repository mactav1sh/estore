import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../../products';
import { useCreateOrder } from '../api/createOrder';
import LoadingOverlay from '../../../components/elements/LoadingOverlay';
import useAuth from '../../../hooks/useAuth';

const OrderForm = () => {
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isLoading, mutate, isSuccess } = useCreateOrder(user?._id);

  const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      paymentMethod: 'cashOnDelivery',
      status: 'confirmed',
      items: state.itemsList.map((item: Product) => item._id),
      taxPrice: state.taxes,
      shippingPrice: state.shippingCost,
      totalPrice: state.totalCost,
      shippingDetails,
    };

    console.log(data);
    mutate({ data });

    // temp redirection
    if (!isSuccess) navigate('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-slate-50 px-2 pt-28 pb-12 md:pb-0 md:pt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-bold uppercase">Order Details</h1>

      {/* CONTENT + FORM */}
      <div className="relative w-full max-w-2xl rounded-sm bg-white px-4 py-6 shadow-md">
        {isLoading && <LoadingOverlay />}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-7 p-6 md:flex-row md:justify-between md:space-y-0 md:space-x-12"
        >
          {/* -- Shipping details */}
          <div className="mb-4 flex-1">
            <p className="mb-4 text-center font-semibold">Shipping Details</p>
            <div className=" mb-3 flex flex-col space-y-1">
              <label htmlFor="country" className="text-sm">
                Country
              </label>
              <input
                id="country"
                type="text"
                placeholder="Egypt"
                required
                className="rounded-md border-2 py-1 px-2 placeholder:text-sm"
                onChange={handleShippingChange}
              />
            </div>
            <div className="mb-3 flex flex-col space-y-1">
              <label htmlFor="city" className="text-sm">
                City
              </label>
              <input
                required
                id="city"
                type="text"
                placeholder="Cairo"
                className="rounded-md border-2 py-1 px-2 placeholder:text-sm"
                onChange={handleShippingChange}
              />
            </div>
            <div className="mb-3 flex flex-col space-y-1">
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <input
                id="address"
                type="text"
                required
                placeholder="10 random st."
                className="rounded-md border-2 py-1 px-2 placeholder:text-sm"
                onChange={handleShippingChange}
              />
            </div>
            <div className="mb-3 flex flex-col space-y-1">
              <label htmlFor="postalCode" className="text-sm">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                placeholder="11511"
                className="rounded-md border-2 py-1 px-2 placeholder:text-sm"
                onChange={handleShippingChange}
              />
            </div>
          </div>
          <div className="mb-2 flex-1">
            <p className="mb-4 text-center font-semibold">Payment</p>
            <div className="mb-3 flex flex-col space-y-2">
              <label htmlFor="paymentMethod" className="text-sm">
                Payment method
              </label>
              <select
                id="paymentMethod"
                className="rounded-md border-2 py-1 px-2 text-sm"
                required
              >
                <option value="cashOnDelivery">Cash on Delivery</option>
                <option value="debitCard" disabled>
                  Debit Card
                </option>
                <option value="bankTransfer" disabled>
                  Bank Transfer
                </option>
              </select>
            </div>

            <div>
              {/* --- subtotal */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">Subtotal.</span>
                <span>{state.cost}$</span>
              </div>
              {/* --- shipping */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">Shipping Est.</span>
                <span>{state.shippingCost}$</span>
              </div>
              {/* --- taxes */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Taxes.</span>
                <span>{state.taxes}$</span>
              </div>
              {/* --- divider */}
              <div className="my-4 mx-auto h-[0.1rem] w-1/3 bg-gray-200"></div>
              {/* --- total price */}
              <div className="mb-4 flex items-center justify-between">
                <span className="">Total Price.</span>
                <span className="font-semibold">
                  {state.totalCost}
                  {}$
                </span>
              </div>
              {/* --- checkout link */}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-brand-pink-600 py-2 font-semibold text-white shadow-md duration-300 hover:bg-brand-pink-500 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-slate-500"
              disabled={state.itemsList?.length === 0}
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default OrderForm;
