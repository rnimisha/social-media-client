import { addCommentService } from '@/common/services';
import { FeedPostType } from '@/common/types';
import { useAppSelector } from '@/store/hook';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type PropsType = {
  onError?: (err: unknown) => void;
};
const useAddComment = ({ onError }: PropsType) => {
  const queryClient = useQueryClient();

  const currUser = useAppSelector((state) => state.user);
  return useMutation(addCommentService, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(['getSinglePost', data.postId]);

      const previousPostData = queryClient.getQueryData<FeedPostType>([
        'getSinglePost',
        data.postId,
      ]);

      queryClient.setQueryData<FeedPostType | undefined>(
        ['getSinglePost', data.postId],
        (prevData) => {
          if (prevData) {
            return {
              ...prevData,
              comments: [
                {
                  id: 1,
                  description: data.description,
                  createdAt: new Date(),
                  userId: data.userId,
                  postId: data.postId,
                  commentBy: {
                    name: currUser.name,
                    username: currUser.username,
                    profilePic: currUser.profilePic,
                  },
                },
                ...prevData.comments,
              ],
            };
          }
          return prevData;
        }
      );
      return { previousPostData };
    },
    onError: (error, newComment, context) => {
      if (context?.previousPostData) {
        queryClient.setQueryData(
          ['getSinglePost', newComment?.postId],
          context.previousPostData
        );
      }
      if (onError) onError(error);
    },
    onSettled: (_, __, { postId }) => {
      queryClient.invalidateQueries(['getSinglePost', postId]);
    },
  });
};

export default useAddComment;
