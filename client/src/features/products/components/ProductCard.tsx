import { Link } from 'react-router-dom';
import { RatingStars } from '../../../components';
import { IProduct } from '..';

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="w-60  rounded-md border bg-white p-2 shadow duration-200 hover:shadow-lg"
    >
      <div className="mt-3 h-40 w-full">
        <img
          src={product.imageUrl}
          alt="product"
          className="mx-auto h-36 bg-contain"
        />
      </div>
      {/* Description */}
      <div className="px-3">
        <span className="mb-1 inline-block text-xs font-bold uppercase text-gray-400">
          {product.category}
        </span>
        <p className="mb-1.5 max-w-[13rem] text-lg font-semibold capitalize leading-6">
          {product.title}
        </p>
        {/* rating */}
        <div className="mb-4 flex space-x-1.5">
          <RatingStars rating={product.averageRating} />
          <div className="text-sm">
            <span className="mr-0.5 font-bold">{product.averageRating}</span>
            <span className="font-medium text-gray-500">
              ({product.reviewIDs.length})
            </span>
          </div>
        </div>
        {/* price */}
        {product.onSale ? (
          <div className="mb-3">
            <span className="mr-3 text-2xl font-bold">
              ${product.salePrice}
            </span>
            <span className="text-sm font-semibold text-gray-400">
              ${product.price}
            </span>
          </div>
        ) : (
          <div className="mb-3">
            <span className="mr-3 text-2xl font-bold">${product.price}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

ProductCard.Loading = function Loading() {
  return (
    <div className="h-80 w-60 animate-pulse rounded-md border bg-white p-2 shadow">
      <div className="mt-3 mb-2 h-40 w-full bg-slate-200"></div>
      {/* Description */}
      <div className="px-3">
        <div className="mb-2  h-2.5 w-10 bg-slate-200"></div>
        <div className="mb-2 h-4 w-48 bg-slate-200"></div>
        {/* rating */}
        <div className="mb-4 flex h-4 w-8 space-x-1.5 bg-slate-200"></div>
        {/* price */}
        <div className="mb-3 h-4 w-16 bg-slate-200"></div>
      </div>
    </div>
  );
};

export default ProductCard;
