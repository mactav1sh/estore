import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="mb-36 flex h-screen items-center bg-home bg-fixed px-2">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center md:items-start">
        <p className="mb-3 w-full max-w-xs text-center text-3xl font-bold capitalize leading-tight tracking-wide text-white md:max-w-xl md:text-left md:text-6xl">
          Everything you need in one place.
        </p>
        <p className="mb-16 max-w-xs text-center text-slate-200 md:max-w-sm md:text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          eum eveniet perferendis excepturi, nesciunt dolorum
        </p>

        <Link
          className="w-fit rounded-md bg-white py-3 px-6 font-semibold capitalize text-brand-pink-500 shadow-xl duration-200 hover:bg-brand-pink-50 md:px-8 md:py-4 md:text-lg"
          to="products"
        >
          <span className="bg-gradient-to-r from-brand-pink-400 to-brand-pink-700 bg-clip-text font-bold  uppercase tracking-wide text-transparent">
            browse products
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
