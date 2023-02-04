import { useGetProducts } from '../api/getProducts';
// import { Product } from '../types';
import LoadingPage from '../../misc/routes/LoadingPage';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { isLoading, data } = useGetProducts();
  const arr = Array(12).fill(null);

  if (isLoading) return <LoadingPage />;

  return (
    <main className="flex min-h-screen items-center justify-center  bg-slate-50 px-2 pb-16 pt-32">
      {/* MAIN CONTENT */}

      <div className="grid w-full grid-cols-1 justify-items-center  rounded-md p-2.5 md:w-auto md:grid-cols-2 md:gap-7 lg:grid-cols-4">
        {/* {data.products.map((product: Product) => (
          <ProductCard key={product._id} />
        ))} */}
        {arr.map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </main>
  );
};

export default Products;
