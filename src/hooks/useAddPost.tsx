import { addNewPost } from '@/common/services';
import { useMutation } from '@tanstack/react-query';
import useFeedPost from './useFeedPost';

type PropsType = {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
};
const useAddPost = ({ onError, onSuccess }: PropsType) => {
  const { refetch } = useFeedPost({});

  return useMutation(addNewPost, {
    onSuccess: () => {
      refetch();

      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
};

export default useAddPost;
