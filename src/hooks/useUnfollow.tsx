import { unFollowUserService } from '@/common/services';
import { FollowingType } from '@/common/types';
import { useAppSelector } from '@/store/hook';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type PropsType = {
  onError?: (err: unknown) => void;
};
const useUnfollow = ({ onError }: PropsType) => {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  return useMutation(unFollowUserService, {
    onMutate: async (id) => {
      await queryClient.cancelQueries(['getAllFollowings', user.username]);

      const prevFollowData = queryClient.getQueryData<FollowingType[]>([
        'getAllFollowings',
        user.username,
      ]);

      queryClient.setQueryData<FollowingType[] | undefined>(
        ['getAllFollowings', user.username],
        (prevData) => {
          if (prevData) {
            return prevData?.filter((data) => data.followingUser.id !== id);
          }
          return prevData;
        }
      );
      return { prevFollowData };
    },
    onError: (error, _, context) => {
      if (context?.prevFollowData) {
        queryClient.setQueryData(
          ['getAllFollowings', user.username],
          context.prevFollowData
        );
      }
      if (onError) onError(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getAllFollowings', user.username]);
    },
  });
};

export default useUnfollow;
