import { Link } from 'react-router-dom';
import RatingStars from '../../../components/elements/RatingStars';
import { Product } from '../types';

const ProductCard = ({ product }: { product: Product }) => {
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

export default ProductCard;
