import { useGetProducts } from '../api/getProducts';
import { IProduct } from '../types';
import { LoadingPage } from '../../misc';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { createQueryStr } from '../../../utils';
import { useEffect, useState } from 'react';

export const Products = () => {
  const [page, setPage] = useState(1);
  const [params] = useSearchParams();

  const limit = 12;
  const queryStr = createQueryStr(params, page, limit);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const { isLoading, data } = useGetProducts(queryStr, queryStr);

  if (isLoading) return <LoadingPage />;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-12 bg-slate-50 px-2 pb-16 pt-32">
      {/* MAIN CONTENT */}
      {data.products && data.products.length > 0 ? (
        <div className="grid w-full grid-cols-1 justify-items-center gap-y-8 rounded-md p-2.5 md:w-auto md:grid-cols-2 md:gap-7 lg:grid-cols-4">
          {data.products.map((product: IProduct) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-semibold capitalize text-gray-500">
          No products found
        </p>
      )}
      <div className="flex space-x-4">
        <button
          className="w-28 flex-1 rounded-sm bg-brand-pink-600 py-1 text-center text-sm font-semibold text-white shadow-sm duration-200  hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-500"
          onClick={() => {
            setPage((p) => p - 1);
          }}
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          className="w-28 flex-1 rounded-sm bg-brand-pink-600 py-1 text-center text-sm font-semibold text-white shadow-sm duration-200  hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-500"
          onClick={() => {
            setPage((p) => p + 1);
          }}
          disabled={!data.products || data.products.length < 12}
        >
          Next
        </button>
      </div>
    </main>
  );
};
