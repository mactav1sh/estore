import { QueryClient, DefaultOptions } from 'react-query';

// query client options
const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

// create a new query client
export const queryClient = new QueryClient({ defaultOptions: queryConfig });
