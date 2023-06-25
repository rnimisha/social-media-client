import withAuth from '@/common/hoc/withAuth';
import { UserDetailType } from '@/common/types';
import { parseError } from '@/common/utils';
import PostCard from '@/components/PostCard';
import { setUserDetails } from '@/features/userSlice';
import useFeedPost from '@/hooks/useFeedPost';
import useGetUserDetail from '@/hooks/useUserDetail';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Box, useToast } from '@chakra-ui/react';

function Home() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.auth);

  // ----------------- user details--------------------------------
  const onGetUserDetailSuccess = (data: UserDetailType) => {
    dispatch(setUserDetails(data));
  };
  const onGetUserDetailError = (error: unknown) => {
    const err = parseError(error);
    toast({
      title: err.error || 'Unexpected Error',
      description: err.message,
      status: 'error',
      position: 'top-right',
      isClosable: true,
    });
  };

  const query = useGetUserDetail({
    username,
    onSuccess: onGetUserDetailSuccess,
    onError: onGetUserDetailError,
  });

  // -------------------- feed posts --------------------------------
  const { data: feedPosts, isLoading: isFeedPostLoading } = useFeedPost({
    onError: onGetUserDetailError,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  if (isFeedPostLoading) {
    return <div>Loading.....</div>;
  }
  return (
    <div>
      {feedPosts &&
        feedPosts.map((item) => (
          <Box key={item.id} ml="20px" mt="20px">
            <PostCard post={item} />
          </Box>
        ))}
    </div>
  );
}

export default withAuth(Home);
