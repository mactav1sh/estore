import { useQuery } from 'react-query';
import { axios } from '../../../lib/axios';

const getProduct = (productId: string) =>
  axios.get(`/products/${productId}`).then((res) => res.data);

export const useGetProduct = (productId: string) =>
  useQuery(['product', productId], () => getProduct(productId));
