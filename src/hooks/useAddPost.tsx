import { addCommentService, addNewPost } from '@/common/services';
import { FeedPostType } from '@/common/types';
import { useAppSelector } from '@/store/hook';

import { useMutation, useQueryClient } from '@tanstack/react-query';

type PropsType = {
  onError?: (err: unknown) => void;
};
const useAddPost = ({ onError }: PropsType) => {
  const queryClient = useQueryClient();

  const currUser = useAppSelector((state) => state.user);

  return useMutation(addNewPost, {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useAddPost;
