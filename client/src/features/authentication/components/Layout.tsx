import { ReactNode, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
interface IProps {
  children?: ReactNode;
  title: string;
  additionalContent?: { text: string; boldtext: string; linkTo: string };
}

const Layout = ({ title, children, additionalContent }: IProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.state?.prevPath || '/';

  useEffect(() => {
    user && navigate(pathName);
  }, [navigate, pathName, user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4  bg-slate-300 px-2">
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
    </main>
  );
};

export default Layout;
