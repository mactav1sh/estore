import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPersonSquare } from 'react-icons/bs';
import useAuth from '../../../hooks/useAuth';
import Divider from '../../elements/Divider';
import storage from '../../../utils/storage';
import HBToggle from '../../elements/HBToggle';
import { SearchBar, CartStatus } from './Header';

function MobileHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();

  const handleLogout = () => {
    storage.removeItem('token');
    window.location.reload();
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="bg-brand-pink-600 px-3 py-2 shadow-xl">
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link
            to="/"
            className="font-logo text-2xl font-semibold uppercase text-white"
          >
            estore
          </Link>
          {/* MOBILE MENU */}
          <HBToggle active={openMenu} onClick={() => setOpenMenu((p) => !p)} />
        </div>

        <div
          className={`flex h-0 flex-col items-center justify-center overflow-hidden duration-700 ease-in-out ${
            openMenu ? 'h-60' : 'h-0'
          }`}
        >
          <div
            className="mb-7 flex flex-col justify-center space-y-1 text-center"
            onClick={() => setOpenMenu((p) => !p)}
          >
            {!user && (
              <>
                <Link
                  to="login"
                  className="border-b-2 py-1 px-2 font-semibold tracking-wider text-white duration-200"
                >
                  Login
                </Link>
                <Link
                  to="register"
                  className="border-b-2 px-2 py-1 font-semibold tracking-wider text-white duration-200"
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <>
                <div className="mb-1 flex items-center justify-center space-x-2 text-white">
                  <BsPersonSquare size={20} />
                  <p className="text-lg font-semibold capitalize ">
                    abdelrahman
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-y-2">
                  <CartStatus styles="text-white mx-auto" userId={user._id} />
                  <button
                    onClick={handleLogout}
                    className="mt-2 inline-block border py-1 px-1 text-xs font-semibold tracking-wider text-white duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
          {/* - cart */}
          <Divider />
          <SearchBar styles="mt-5" />
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
