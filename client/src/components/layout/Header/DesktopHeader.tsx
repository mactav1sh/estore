import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsPersonSquare } from 'react-icons/bs';
import { MdCelebration } from 'react-icons/md';
import { AnnouncementBar, ContentWrapper, Divider } from '../..';
import useAuth from '../../../hooks/useAuth';
import useOnOutsideClick from '../../../hooks/useOnOutsideClick';
import { storage } from '../../../utils';
import { SearchBar, CartStatus } from './Header';

export const DesktopHeader = () => {
  const accountRef = useRef<HTMLDivElement>(null);
  const [openAccount, setOpenAccount] = useState(false);

  const { user } = useAuth();
  useOnOutsideClick(accountRef, setOpenAccount);

  const handleLogout = () => {
    storage.removeItem('token');
    window.location.reload();
  };

  return (
    <header className="fixed top-0 z-10 w-full">
      <AnnouncementBar styles={{ backgroundColor: '#ffe8cc' }}>
        <p className="text-xs font-bold capitalize tracking-wide">
          We are excited to announce that our partnership with
          <span className="text-orange-600"> z-tech</span> is finally official !
        </p>
        <MdCelebration className="h-5 w-5 text-orange-600" />
      </AnnouncementBar>
      <div className="bg-brand-pink-600 py-3 shadow-md">
        <ContentWrapper>
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="font-logo text-2xl font-semibold uppercase text-white"
            >
              estore
            </Link>
            {/* Search bar */}
            <SearchBar />
            {/* account and cart */}
            <div className="flex space-x-1 pr-2 text-white md:pr-4">
              {/* - account */}
              <div ref={accountRef} className="relative">
                <div
                  className="flex cursor-pointer items-center space-x-1 rounded-md py-1.5 px-2 duration-200 hover:bg-brand-pink-700"
                  onClick={() => setOpenAccount((prev) => !prev)}
                >
                  <BsPersonSquare />
                  <span>Account</span>
                </div>
                {/* modal */}
                {openAccount && (
                  <div className="absolute top-12 right-0 w-36 rounded-b-sm bg-white p-3 text-slate-900 shadow-lg">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      {!user && (
                        <>
                          <Link
                            to="login"
                            className="mx-2 w-full rounded-sm bg-brand-pink-600 py-1 text-center text-sm font-semibold text-white shadow-md duration-200 hover:bg-brand-pink-500"
                            onClick={() => setOpenAccount(false)}
                          >
                            Login
                          </Link>
                          <Divider />
                          <Link
                            to="register"
                            className="mx-2 w-full rounded-sm bg-slate-200 py-1 text-center text-sm  duration-200 hover:bg-slate-300"
                            onClick={() => setOpenAccount(false)}
                          >
                            Register
                          </Link>
                        </>
                      )}
                      {user && (
                        <>
                          <p className="text-sm capitalize">{user.name}</p>
                          <Divider />
                          <button
                            onClick={handleLogout}
                            className="mx-2 w-full rounded-sm bg-slate-200 py-1 text-center text-sm duration-200 hover:bg-slate-300"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* - cart */}
              {user && <CartStatus styles="py-1.5 px-2" userId={user._id} />}
            </div>
            {/* account and cart */}
          </div>
        </ContentWrapper>
      </div>
    </header>
  );
};
