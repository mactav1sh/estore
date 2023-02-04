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
    <section className="mb-56 md:mb-64">
      <ContentWrapper>
        <div className="item flex justify-between">
          <h3 className="mb-16 text-4xl font-bold capitalize">{title}</h3>
          <Link
            to="products"
            className="h-fit text-lg font-semibold capitalize text-gray-500"
          >
            {secondaryText}
          </Link>
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-3 lg:grid-cols-4">
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
