import { unFollowUserService } from '@/common/services';
import { FollowingType, ProfileType } from '@/common/types';
import { useAppSelector } from '@/store/hook';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type PropsType = {
  onError?: (err: unknown) => void;
};
const useUnfollow = ({ onError }: PropsType) => {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  return useMutation(unFollowUserService, {
    onMutate: async ({ id, username }) => {
      await Promise.allSettled([
        queryClient.cancelQueries(['getAllFollowings', user.username]),
        queryClient.cancelQueries(['getProfileDetail', username]),
      ]);

      const prevFollowData = queryClient.getQueryData<FollowingType[]>([
        'getAllFollowings',
        user.username,
      ]);
      const prevProfileData = queryClient.getQueryData<ProfileType>([
        'getProfileDetail',
        username,
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

      queryClient.setQueryData<ProfileType | undefined>(
        ['getProfileDetail', username],
        (prevData) => {
          if (prevData) {
            return {
              ...prevData,
              followerCount: prevData.followerCount - 1,
            };
          }
          return prevData;
        }
      );
      return { prevFollowData, prevProfileData };
    },
    onError: (error, newData, context) => {
      if (context?.prevFollowData) {
        queryClient.setQueryData(
          ['getAllFollowings', user.username],
          context.prevFollowData
        );
      }
      if (context?.prevProfileData) {
        queryClient.setQueryData(
          ['getProfileDetail', newData?.username],
          context.prevProfileData
        );
      }
      if (onError) onError(error);
    },
    onSettled: (_, __, { username }) => {
      queryClient.invalidateQueries(['getAllFollowings', user.username]);
      queryClient.invalidateQueries(['getProfileDetail', username]);
    },
  });
};

export default useUnfollow;
