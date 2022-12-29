import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

const getAllProducts = (query?: string) =>
  axios.get(`/products${query}`).then((res) => res.data);

export const useGetProducts = (query?: string) =>
  useQuery(['products'], () => getAllProducts(query || ''));
