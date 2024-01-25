import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Carousel, Hero, ContentWrapper, Slide } from '../../../components';
import { ReactComponent as EmailLogo } from '../../../assets/svgs/email.svg';
import ProductsSection from '../../products';
import { useGetProducts } from '../../products';
import { IProduct } from '../../products';

export const Home = () => {
  const { isLoading: categoriesLoading, data: categoriesData } = useGetProducts(
    '?fields=category',
    'categories'
  );

  const { isLoading: featuredLoading, data: featuredData } = useGetProducts(
    '?limit=4&onSale=true&page=2',
    'featured'
  );

  const { isLoading: onSaleLoading, data: onSaleData } = useGetProducts(
    '?limit=4&onSale=true&page=1',
    'onSale'
  );

  const getCategories = (data: any[]) => {
    return data.reduce((acc: string[], product: IProduct) => {
      if (!acc.includes(product.category)) {
        acc.push(product.category);
      }
      return acc;
    }, []);
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero - section */}
      <Hero />
      {/* Carousel - Section */}
      <section className="flex items-center justify-center px-2 pb-36">
        <div className="max-w-[18rem] md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
          <Carousel>
            {!categoriesLoading && categoriesData
              ? getCategories(categoriesData.products).map(
                  (categoryName: string) => (
                    <Slide key={categoryName} title={categoryName} />
                  )
                )
              : Array(4)
                  .fill(null)
                  .map(() => <Slide.Loading />)}
          </Carousel>
        </div>
      </section>
      {/* featured section */}
      <ProductsSection
        isLoading={featuredLoading}
        title="featured items"
        secondaryText="view all products"
        products={featuredData?.products}
      />
      {/* on sale section */}
      <ProductsSection
        isLoading={onSaleLoading}
        title="on sale items"
        secondaryText="view all products"
        products={onSaleData?.products}
      />

      {/* newsletter */}
      <section className="mb-7 pt-32 pb-10 md:mb-10">
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
};
