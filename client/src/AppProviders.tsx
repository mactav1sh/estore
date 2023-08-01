import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthProvider from './context/authContext';
import { queryClient } from './lib/react-query';
import ScrollRestoration from './features/misc/components/ScrollRestoration';

interface IProps {
  children?: ReactNode;
}

const AppProviders = ({ children }: IProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollRestoration>
          <AuthProvider>
            {children}
            <ReactQueryDevtools />
          </AuthProvider>
        </ScrollRestoration>
      </Router>
    </QueryClientProvider>
  );
};

export default AppProviders;
