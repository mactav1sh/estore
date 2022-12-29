import { Link } from 'react-router-dom';

import { Product } from '../types';

const ProductSmallCard = ({ product }: { product: Product }) => {
  const imgUrl =
    product.imageUrl ||
    'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  return (
    <Link to={`/products/${product._id}`} className="p-2">
      <div>
        <img src={imgUrl} className="mb-1 h-52 w-52 rounded-t-md " alt="" />
      </div>
      {/* Text */}
      <div>
        <p className="text-center text-lg font-semibold">{product.title}</p>
        <p className="mb-3 text-center text-sm">{product.category}</p>
        {/* onsale */}

        <div className="flex flex-col items-center justify-between space-y-1 ">
          {product.onSale ? (
            <div className="relative">
              {/* og price */}
              <span className="text-sm font-semibold text-gray-500 line-through decoration-red-700 decoration-[1.5px]">
                $ {product.price}
              </span>
              {/* sale price */}
              <span className="ml-1.5 text-lg font-bold text-gray-500">
                $ {product.salePrice}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-500">
              $ {product.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductSmallCard;
