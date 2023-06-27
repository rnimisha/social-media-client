import { followUserService } from '@/common/services';
import { FollowingType, ProfileType } from '@/common/types';
import { useAppSelector } from '@/store/hook';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type PropsType = {
  onError?: (err: unknown) => void;
};
const useFollow = ({ onError }: PropsType) => {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  return useMutation(followUserService, {
    onMutate: async ({ userToFollowId, username }) => {
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
        ['getAllFollowings', username],
        (prevData) => {
          if (prevData) {
            return [
              ...prevData,
              {
                id: 10000,
                followingUser: {
                  id: userToFollowId,
                  username: '',
                  name: '',
                },
              },
            ] as FollowingType[];
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
              followerCount: prevData.followerCount + 1,
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

export default useFollow;
