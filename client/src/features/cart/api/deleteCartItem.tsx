import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../lib/axios';

const deleteCartItem = ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => axios.patch(`/cart/remove/${userId}/${productId}`);

export const useDeleteCartItem = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation(deleteCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart', userId]);
    },
  });
};
