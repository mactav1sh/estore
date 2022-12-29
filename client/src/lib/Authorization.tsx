import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface Props {
  children?: JSX.Element;
  path?: string;
}
const ProtectedRoute = ({ path = '/' }: Props) => {
  const { user, status } = useAuth();
  if (status === 'loading') return <h1>Loading...</h1>;
  if (!user) {
    return <Navigate to={path} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
