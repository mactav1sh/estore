import React from 'react';
import { Link } from 'react-router-dom';
import ImgF from '../../../assets/imgs/fossil.png';
import RatingStars from '../../../components/elements/RatingStars';

const ProductCard = () => {
  return (
    <Link to="/" className="max-w-max rounded-md border bg-white p-2 shadow">
      <img src={ImgF} alt="product" className="mx-auto mt-4 mb-5 w-32" />
      {/* Description */}
      <div className="px-3">
        <span className="mb-1 inline-block text-xs font-bold uppercase text-gray-400">
          FOSSIL
        </span>
        <p className="mb-1.5 max-w-[13rem] text-lg font-semibold capitalize leading-6">
          Chronograph leather Commuter
        </p>
        {/* rating */}
        <div className="mb-4 flex space-x-1.5">
          <RatingStars />
          <div className="text-sm">
            <span className="mr-0.5 font-bold">4.5</span>
            <span className="font-medium text-gray-500">(20)</span>
          </div>
        </div>
        {/* price */}
        <div className="mb-3">
          <span className="mr-3 text-2xl font-bold">$125</span>
          <span className="text-sm font-semibold text-gray-400">$225</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
