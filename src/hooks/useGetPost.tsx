import { getSinglePost } from '@/common/services';
import { FeedPostType } from '@/common/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  postid: number;
  username: string;
  onSuccess?: (data: FeedPostType) => void;
  onError?: (err: unknown) => void;
};

const useGetPost = ({ postid, username, onSuccess, onError }: Props) =>
  useQuery<FeedPostType, Error>(
    ['getSinglePost', postid],
    () => getSinglePost({ username, postid }),
    {
      onSuccess,
      onError,
    }
  );

export default useGetPost;
