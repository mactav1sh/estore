import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/authContext';

interface IProps {
  children?: ReactNode;
}

const AppProviders = ({ children }: IProps) => {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  );
};

export default AppProviders;
