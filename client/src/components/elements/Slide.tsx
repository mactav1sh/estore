import { getIcon } from '../../utils';
import { Link } from 'react-router-dom';
import { BsBox } from 'react-icons/bs';

export function Slide({ title }: { title: string }) {
  const Icon = getIcon(title);
  return (
    <div className="group relative my-4 mr-2 ml-3 overflow-hidden rounded-md bg-brand-pink-50 bg-contain bg-right bg-no-repeat p-4 shadow">
      <Icon className="absolute bottom-12 right-4 h-20 w-20 text-white duration-300 group-hover:text-brand-pink-200 md:bottom-4 md:right-4 md:h-36 md:w-36" />
      <div className="mb-20 md:mb-24">
        <p className="mb-2 text-xl font-bold capitalize text-brand-pink-900 md:text-2xl">
          {title}
        </p>
        <p className="max-w-[14rem] text-brand-pink-900 opacity-80">
          Great products at amazing prices.
        </p>
      </div>
      <Link
        to={`products?category=${title}`}
        className="rounded-md bg-white py-2 px-8 text-base font-semibold text-brand-pink-900 shadow-md duration-200 hover:bg-brand-pink-100"
      >
        Shop Now
      </Link>
    </div>
  );
}

Slide.Loading = function Loading() {
  return (
    <div className="relative my-4 mr-2 ml-3 animate-pulse overflow-hidden rounded-md bg-slate-50 bg-contain bg-right bg-no-repeat p-4 shadow">
      <BsBox className="absolute bottom-12 right-4 h-20 w-20 text-slate-200 md:bottom-4 md:right-4 md:h-36 md:w-36" />
      <div className="mb-20 md:mb-24">
        <div className="mb-2 h-8 w-56 bg-slate-200"></div>
        <div className="h-5 w-36  bg-slate-200"></div>
      </div>
      <div className="h-8 w-36 bg-slate-200 py-2 px-8 duration-200"></div>
    </div>
  );
};
