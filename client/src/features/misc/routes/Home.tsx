import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from '../../../components/widgets/Carousel';
import Hero from '../../../components/layout/Hero/Hero';
import ContentWrapper from '../../../components/elements/ContentWrapper';
import { ReactComponent as EmailLogo } from '../../../assets/svgs/email.svg';
import ProductsSection from '../../products/components/ProductsSection';
import { useGetProducts } from '../../products/api/getProducts';
import LoadingPage from './LoadingPage';
import { getIcon } from '../../../utils/getIcon';
import { Product } from '../../products';

const Home = () => {
  const { isLoading, data } = useGetProducts();
  if (isLoading) return <LoadingPage />;

  const categories = data.products.reduce((acc: string[], product: Product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  return (
    <main className="h-screen">
      {/* Hero - section */}
      <Hero />
      {/* Carousel - Section */}
      <section className="flex items-center justify-center px-2 pb-36">
        <div className="mx-auto max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
          <Carousel>
            {categories.map((categoryName: string) => (
              <Slide key={categoryName} title={categoryName} />
            ))}
          </Carousel>
        </div>
      </section>
      <ProductsSection
        title="featured items"
        secondaryText="view all products"
        products={data.products}
      />
      {/* newsletter */}
      <section className="pb-10">
        <ContentWrapper>
          <div className="relative mx-auto flex w-full max-w-md flex-col items-center justify-center rounded bg-brand-pink-600 py-10 md:max-w-none">
            <EmailLogo className="absolute -top-24 left-16 -z-10 h-36 w-fit -rotate-12 md:-top-32 md:h-44" />
            <h3 className="text-center text-2xl font-bold uppercase text-white md:text-4xl">
              newsletter
            </h3>

            <p className="mb-7 text-center font-thin text-white md:text-left md:text-lg">
              subscribe to keep up with our latest offers and flash sales
            </p>

            <div className="flex w-full max-w-lg flex-col items-center justify-center space-y-3 px-2 md:flex-row md:space-y-0">
              <input
                type="text"
                className="mx-2 h-auto w-full max-w-xs rounded-sm py-0.5 px-2 placeholder:text-center placeholder:font-semibold md:max-w-xl md:py-1.5"
                placeholder="Email Address"
              />
              <button className="rounded-sm bg-yellow-400 py-1 px-4 text-sm font-bold uppercase tracking-wider text-white duration-200 hover:bg-slate-300 md:py-2 md:px-6">
                subscribe
              </button>
            </div>
          </div>
        </ContentWrapper>
      </section>
    </main>
  );

  function Slide({ title }: { title: string }) {
    const Icon = getIcon(title || 'headphones');
    return (
      <div className="relative my-4 mr-3 ml-4 overflow-hidden rounded-md bg-brand-pink-50 bg-contain bg-right bg-no-repeat p-8 shadow">
        <div className="mb-24 ">
          <p className="mb-2 text-2xl font-bold capitalize text-brand-pink-900">
            {title}
          </p>
          <p className="max-w-[14rem] text-brand-pink-900 opacity-80">
            Lorem ipsum dolor sit, amet consectetur adipisicing dolor
          </p>
        </div>
        <Link
          to={`products?category=${title}`}
          className="rounded-md bg-white py-2 px-8 text-base font-semibold text-brand-pink-900 shadow-md duration-200 hover:bg-brand-pink-100"
        >
          Shop Now
        </Link>
        <Icon className="absolute bottom-4 right-4 h-36 w-36 text-white" />
      </div>
    );
  }
};

export default Home;
