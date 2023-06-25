import { unlikePostService } from '@/common/services';
import { FeedPostType } from '@/common/types';
import { useAppSelector } from '@/store/hook';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUnLikePost = () => {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  return useMutation(unlikePostService, {
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries(['getMyFeedPost']);
      const previousPostData = queryClient.getQueryData<
        FeedPostType[] | undefined
      >(['getMyFeedPost']);

      queryClient.setQueryData<FeedPostType[] | undefined>(
        ['getMyFeedPost'],
        (prevData) => {
          if (prevData) {
            return prevData.map((post) => {
              const isPresent = post.likes.find(
                (item) => item.userId === user.id
              );
              if (post.id === postId && isPresent) {
                return {
                  ...post,
                  likes: post.likes.filter((like) => like.userId !== user.id),
                };
              }
              return post;
            });
          }
          return prevData;
        }
      );
      return { previousPostData };
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (_error, _, context: any) => {
      // Revert back to the previous feed post data on error
      if (context?.previousData) {
        queryClient.setQueryData(['getMyFeedPost'], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getMyFeedPost']);
    },
  });
};

export default useUnLikePost;
