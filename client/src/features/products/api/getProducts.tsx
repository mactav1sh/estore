import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

const getAllProducts = (query?: string) =>
  axios.get(`/products${query}`).then((res) => res.data);

export const useGetProducts = (query?: string, additionalKey?: string) => {
  const keys: string[] = additionalKey
    ? ['products', additionalKey]
    : ['products'];

  return useQuery([...keys], () => getAllProducts(query || ''));
};
