import { Link } from 'react-router-dom';
import ContentWrapper from '../../../components/elements/ContentWrapper';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface Props {
  products?: Product[];
  title?: string;
  secondaryText?: string;
}

const ProductsSection = ({ products, title, secondaryText = '' }: Props) => {
  return (
    <section className="mb-44 md:mb-56 lg:mb-64">
      <ContentWrapper>
        <div className="item mb-10 flex items-center justify-between md:mb-16">
          <h3 className=" text-2xl font-bold capitalize lg:text-4xl">
            {title}
          </h3>
          <Link
            to="products"
            className="h-fit text-sm font-semibold capitalize text-gray-500 md:text-lg"
          >
            {secondaryText}
          </Link>
        </div>
        <div className="grid-cols-1: grid justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array(4)
            .fill(null)
            .map((_item, i) => (
              <ProductCard key={i} />
            ))}
        </div>
      </ContentWrapper>
    </section>
  );
};

export default ProductsSection;
