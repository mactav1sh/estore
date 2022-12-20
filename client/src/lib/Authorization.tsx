import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface Props {
  children?: JSX.Element;
  path?: string;
}
const ProtectedRoute = ({ children, path = '/' }: Props) => {
  const { user, status } = useAuth();
  console.log(user);
  if (status === 'loading') return <h1>Loading...</h1>;
  console.log(path);

  if (!user) {
    return <Navigate to={path} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
