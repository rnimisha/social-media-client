import { likePostService } from '@/common/services';
import { FeedPostType } from '@/common/types';
import { useAppSelector } from '@/store/hook';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLikePost = () => {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  return useMutation(likePostService, {
    onMutate: async ({ postId }) => {
      await Promise.allSettled([
        queryClient.cancelQueries(['getSinglePost', postId]),
        queryClient.cancelQueries(['getMyFeedPost']),
      ]);
      const previousPostData = queryClient.getQueryData<FeedPostType>([
        'getSinglePost',
        postId,
      ]);
      const previousFeedData = queryClient.getQueryData<FeedPostType[]>([
        'getMyFeedPost',
      ]);

      queryClient.setQueryData<FeedPostType | undefined>(
        ['getSinglePost', postId],
        (prevData) => {
          if (prevData) {
            const isPresent = prevData.likes.find(
              (item) => item.userId === user.id
            );
            if (!isPresent) {
              return {
                ...prevData,
                likes: [
                  ...prevData.likes,
                  {
                    id: Math.max(...prevData.likes.map((like) => like.id)) + 1,
                    userId: user.id,
                    postId,
                  },
                ],
              };
            }
          }
          return prevData;
        }
      );

      queryClient.setQueryData<FeedPostType[] | undefined>(
        ['getMyFeedPost'],
        (prevData) => {
          if (prevData) {
            return prevData.map((post) => {
              const isPresent = post.likes.find(
                (item) => item.userId === user.id
              );
              if (post.id === postId && !isPresent) {
                return {
                  ...post,
                  likes: [
                    ...post.likes,
                    {
                      id: Math.max(...post.likes.map((like) => like.id)) + 1,
                      userId: user.id,
                      postId,
                    },
                  ],
                };
              }
              return post;
            });
          }
          return prevData;
        }
      );
      return { previousPostData, previousFeedData };
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

export default useLikePost;
