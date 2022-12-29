import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../lib/axios';

const addCartProduct = ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => axios.patch(`/cart/add/${userId}/${productId}`);

export const useAddCartProduct = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(addCartProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', userId]);
    },
  });
};
