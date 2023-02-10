import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import { useGetCart } from '../../../features/cart/api/getCart';

const Header = () => {
  const [windowWidth, SetWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      SetWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return windowWidth > 768 ? <DesktopHeader /> : <MobileHeader />;
};

export default Header;

export function SearchBar({ styles }: { styles?: string }) {
  const [text, setText] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full max-w-xs shadow-sm md:max-w-sm lg:max-w-xl ${styles}`.trim()}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        name="search"
        placeholder="Search Products and Categories"
        className="w-full rounded-l-md px-2 py-1.5 placeholder:text-center focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-r-md bg-slate-200 px-4 text-slate-500 duration-200  hover:bg-slate-300 active:bg-slate-400"
      >
        Search
      </button>
    </form>
  );
}

export function CartStatus({
  userId,
  styles,
}: {
  userId: string;
  styles?: string;
}): JSX.Element {
  const cartData = useGetCart(userId);
  return (
    <Link
      to="cart"
      className={`flex items-center space-x-1 rounded-md duration-200 hover:bg-brand-pink-700 ${styles}`.trim()}
    >
      <div className="flex items-center justify-center space-x-0.5">
        <BsCart2 />
        <span>Cart</span>
      </div>
      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-brand-pink-50 text-[0.5rem] font-semibold text-brand-pink-900">
        <span>{cartData?.data?.cart?.itemsList?.length || 0}</span>
      </div>
    </Link>
  );
}
