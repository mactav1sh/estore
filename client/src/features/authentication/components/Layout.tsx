import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
interface IProps {
  children?: ReactNode;
  title: string;
  additionalContent?: { text: string; boldtext: string; linkTo: string };
}

const Layout = ({ title, children, additionalContent }: IProps) => {
  return (
    <main>
      <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-slate-300 px-2 text-gray-700 ">
        {/* TITLE */}

        <h1 className="text-2xl font-bold uppercase">{title}</h1>

        {/* CONTENT + FORM */}
        <div className="w-full max-w-sm  bg-white px-4 py-6 shadow-md">
          {/* - FORM */}
          {children}

          {/* ADDITIONAL CONTENT */}
          {additionalContent && (
            <div>
              {/* - DIVIDING LINE */}
              <div className="m-auto mt-8 mb-4 h-0.5 w-2/5 bg-slate-200"></div>
              <p>
                {additionalContent.text}{' '}
                <Link
                  to={`/${additionalContent.linkTo}`}
                  className="font-semibold duration-300 hover:text-pink-600"
                >
                  {additionalContent.boldtext}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Layout;
