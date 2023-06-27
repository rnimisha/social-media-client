import { getUserAllPost } from '@/common/services';
import { FeedPostType } from '@/common/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  username: string;
  onSuccess?: (data: FeedPostType[]) => void;
  onError?: (err: unknown) => void;
};

const useGetUserPosts = ({ username, onSuccess, onError }: Props) =>
  useQuery<FeedPostType[], Error>(
    ['getUserAllPost', username],
    () => getUserAllPost({ username }),
    {
      onSuccess,
      onError,
    }
  );

export default useGetUserPosts;
