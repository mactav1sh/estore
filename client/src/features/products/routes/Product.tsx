import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BsCart4, BsStarFill, BsFillCartCheckFill } from 'react-icons/bs';
import { useGetProduct } from '../api/getProduct';
import LoadingPage from '../../misc/routes/LoadingPage';
import { useAddCartProduct } from '../api/addCartProduct';
import useAuth from '../../../hooks/useAuth';
import ContentWrapper from '../../../components/elements/ContentWrapper';

const Product = () => {
  const [showLoginLink, setShowLoginLink] = useState(false);

  const { productId } = useParams();
  const location = useLocation();

  const { user } = useAuth();
  const addProductMutation = useAddCartProduct();
  const { isLoading, data } = useGetProduct(productId as string);

  const handleAddToCart = () => {
    if (user)
      return addProductMutation.mutate({
        userId: user._id,
        productId: productId as string,
      });

    setShowLoginLink(true);
  };

  if (isLoading) return <LoadingPage />;

  const imgUrl =
    data.product.imageUrl ||
    'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-2">
      <ContentWrapper>
        {/* MAIN CONTENT */}
        <div className="flex w-full flex-col items-center justify-center space-y-6 rounded-md bg-white px-5 py-8 shadow-md md:h-96 md:flex-row md:space-y-0 md:space-x-16 md:pr-8">
          {/* IMAGE */}
          <div className="max-w-xs self-center">
            <img
              src={imgUrl}
              alt={data.product.title}
              className="rounded-t-md md:rounded-t-none md:rounded-l-md"
            />
          </div>
          {/* CONTENT */}
          <div className="flex max-w-lg flex-col items-center  md:max-w-none lg:w-[28rem]">
            {/* - TITLE AND DESC */}
            <div className="mb-9 w-96 md:mb-12 md:w-full md:text-left">
              <div className="flex items-center space-x-3">
                {/* -- TITLE */}
                <p className="mb-2 text-2xl font-bold capitalize md:text-3xl">
                  {data.product.title}
                </p>
                {/* -- RATING */}
                <div className="flex items-center space-x-1">
                  <span className=" md:text-lg">
                    {data.product.averageRating}
                  </span>
                  <BsStarFill className="h-4 w-4 text-yellow-400" />
                </div>
              </div>

              <p className="max-w-xs text-sm text-gray-500 md:max-w-md md:text-base">
                {data.product.description}
              </p>
            </div>

            {/* - PRICE AND BUTTON */}
            <div className="flex w-full max-w-sm items-center justify-between pr-6 md:max-w-md">
              {addProductMutation.isSuccess ? (
                <Link
                  to="/cart"
                  className="rounded-md bg-green-600 py-2 px-4 font-semibold text-white shadow-md duration-300 hover:bg-green-500"
                >
                  <div className="flex items-center space-x-2">
                    <span>Go to cart</span>
                    <BsFillCartCheckFill className="h-4 w-4" />
                  </div>
                </Link>
              ) : (
                <button
                  type="button"
                  className="rounded-md bg-brand-pink-600 py-2 px-4 font-semibold text-white shadow-md duration-300 hover:bg-brand-pink-400"
                  onClick={handleAddToCart}
                >
                  <div className="flex items-center space-x-2">
                    <span>Add to cart</span>
                    <BsCart4 className="h-4 w-4" />
                  </div>
                </button>
              )}

              {data.product.onSale ? (
                <div className="relative">
                  {/* og price */}
                  <span className="text-sm font-semibold text-gray-500 line-through decoration-red-700 decoration-[1.5px]">
                    $ {data.product.price}
                  </span>
                  {/* sale price */}
                  <span className="ml-1.5 text-xl font-bold text-gray-500">
                    $ {data.product.salePrice}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-500">
                  $ {data.product.price}
                </span>
              )}
            </div>

            {showLoginLink && (
              <p className="mt-3 w-full max-w-xs text-center text-sm md:text-left lg:max-w-none">
                You are not logged in, please{' '}
                <Link
                  to="/login"
                  state={{ prevPath: location.pathname }}
                  className="font-medium duration-300 hover:text-pink-600"
                >
                  login
                </Link>{' '}
                first.
              </p>
            )}
            {/* - REVIEW */}
          </div>
        </div>
      </ContentWrapper>
    </main>
  );
};

export default Product;
