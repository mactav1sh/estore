import { Link } from 'react-router-dom';
import { ContentWrapper } from '../../../components';
import { IProduct } from '..';
import ProductCard from './ProductCard';

interface Props {
  products: IProduct[];
  title?: string;
  secondaryText?: string;
}

const ProductsSection = ({ products, title, secondaryText = '' }: Props) => {
  return (
    <section className="mb-20 md:mb-24 lg:mb-28">
      <ContentWrapper>
        <div className="item mb-10 flex items-center justify-between md:mb-16">
          <h3 className="text-xl font-bold capitalize md:text-2xl lg:text-4xl">
            {title}
          </h3>
          <Link
            to="products"
            className="h-fit text-sm font-semibold capitalize text-gray-500 md:text-base"
          >
            {secondaryText}
          </Link>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-6 gap-x-0 md:grid-cols-2 md:gap-y-16 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </ContentWrapper>
    </section>
  );
};

export default ProductsSection;
