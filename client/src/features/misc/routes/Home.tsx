import { Link } from 'react-router-dom';
import { BiHeadphone } from 'react-icons/bi';
import Carousel from '../../../components/widgets/Carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Hero from '../../../components/layout/Hero/Hero';
import ContentWrapper from '../../../components/elements/ContentWrapper';
import { ReactComponent as EmailLogo } from '../../../assets/svgs/email.svg';
import ProductsSection from '../../products/components/ProductsSection';

const Home = () => {
  return (
    <main className="h-screen">
      {/* Hero - section */}
      <Hero />
      {/* Carousel - Section */}
      <section className="flex items-center justify-center px-2 pb-36">
        <div className="mx-auto max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
          <Carousel>
            {Array(7)
              .fill(null)
              .map((_val, i) => (
                <Slide key={i} />
              ))}
          </Carousel>
        </div>
      </section>
      <ProductsSection
        title="featured items"
        secondaryText="view all products"
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

  function Slide() {
    return (
      <div className="relative my-4 mr-3 ml-4 overflow-hidden rounded-md bg-brand-pink-50 bg-contain bg-right bg-no-repeat p-8 shadow">
        <div className="mb-24 ">
          <p className="mb-2 text-2xl font-bold text-brand-pink-900">
            Headphones
          </p>
          <p className="max-w-[14rem] text-brand-pink-900 opacity-80">
            Lorem ipsum dolor sit, amet consectetur adipisicing dolor
          </p>
        </div>
        <Link
          to="products"
          className="rounded-md bg-white py-2 px-8 text-base font-semibold text-brand-pink-900 shadow-md duration-200 hover:bg-brand-pink-100"
        >
          Shop Now
        </Link>
        <BiHeadphone className="absolute bottom-4 right-4 h-36 w-36 text-white" />
      </div>
    );
  }
};

export default Home;
