import { useGetProducts } from '../api/getProducts';
import { Product } from '../types';
import LoadingPage from '../../misc/routes/LoadingPage';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { createQueryStr } from '../../../utils/createQueryStr';

const Products = () => {
  const [params] = useSearchParams();
  const queryStr = createQueryStr(params);

  const { isLoading, data } = useGetProducts(queryStr, queryStr);

  if (isLoading) return <LoadingPage />;
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-2 pb-16 pt-32">
      {/* MAIN CONTENT */}
      {data.products && data.products.length > 0 ? (
        <div className="grid w-full grid-cols-1 justify-items-center gap-y-8 rounded-md p-2.5 md:w-auto md:grid-cols-2 md:gap-7 lg:grid-cols-4">
          {data.products.map((product: Product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-semibold capitalize text-gray-500">
          No products found
        </p>
      )}
    </main>
  );
};

export default Products;
