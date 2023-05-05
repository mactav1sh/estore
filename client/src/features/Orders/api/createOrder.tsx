import { axios } from '../../../lib/axios';
import { useMutation, useQueryClient } from 'react-query';
import { Order } from '../types';

const createOrder = ({ data }: { data: Order }) => axios.post(`/orders`, data);

export const useCreateOrder = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', userId]);
    },
  });
};
