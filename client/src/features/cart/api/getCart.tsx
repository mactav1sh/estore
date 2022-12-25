import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

const getCart = (userId: string) =>
  axios.get(`/cart/${userId}`).then((response) => response.data);

export const useGetCart = (userId: string) => {
  return useQuery(['cart', userId], () => getCart(userId));
};
