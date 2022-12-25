import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthProvider from './context/authContext';
import { queryClient } from './lib/react-query';

interface IProps {
  children?: ReactNode;
}

const AppProviders = ({ children }: IProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          {children}
          <ReactQueryDevtools />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default AppProviders;
