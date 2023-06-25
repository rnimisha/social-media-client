import { getFeedPosts } from '@/common/services';
import { FeedPostType } from '@/common/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  onSuccess?: (data: FeedPostType[]) => void;
  onError?: (err: unknown) => void;
};

const useFeedPost = ({ onSuccess, onError }: Props) =>
  useQuery<FeedPostType[], Error>(['getMyFeedPost'], () => getFeedPosts(), {
    onSuccess,
    onError,
  });

export default useFeedPost;
