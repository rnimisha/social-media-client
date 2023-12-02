import { getFeedPosts } from '@/common/services';
import { FeedPostType } from '@/common/types';
import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
} from '@tanstack/react-query';

type Props = {
  onSuccess?: (data: InfiniteData<FeedPostType[]>) => void;
  onError?: (err: unknown) => void;
};

const useFeedPost = ({ onSuccess, onError }: Props) =>
  useInfiniteQuery<FeedPostType[], Error>(
    ['getMyFeedPost'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ pageParam = 1 }: QueryFunctionContext<any>) => {
      const pageSize = 10;
      // const delayedFetch = new Promise<FeedPostType[]>((resolve) => {
      //   setTimeout(async () => {
      //     const data = await getFeedPosts(pageParam, pageSize);
      //     resolve(data);
      //   }, 1000);
      // });
      // return delayedFetch;
      const data = await getFeedPosts(pageParam, pageSize);
      return data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const pageSize = 10;
        if (lastPage.length < pageSize) {
          return undefined;
        }
        return allPages.length + 1;
      },
      onSuccess,
      onError,
    }
  );
export default useFeedPost;
