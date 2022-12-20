import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';
import storage from '../../../utils/storage';

// Query fn
const getCart = (userId: string, token: string) =>
  axios.get(`/cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Hook
const useGetCart = (userId: string) => {
  const token = storage.getItem('token');
  return useQuery({
    queryKey: ['cart', userId],
    queryFn: () => getCart(userId, token),
  });
};

export default useGetCart;
