import withAuth from '@/common/hoc/withAuth';
import { UserDetailType } from '@/common/types';
import { parseError } from '@/common/utils';
import PostCard from '@/components/PostCard';
import { setUserDetails } from '@/features/userSlice';
import useFeedPost from '@/hooks/useFeedPost';
import useGetUserDetail from '@/hooks/useUserDetail';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Box, Card, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const navigateSinglePost = (id: number, uname: string) => {
    navigate(`/post/${uname}/${id}`);
  };
  return (
    <div>
      {feedPosts &&
        feedPosts.length > 0 &&
        feedPosts?.map((item) => (
          <Box key={item.id} ml="20px" mt="20px">
            <Card
              maxW="2xl"
              onClick={() =>
                navigateSinglePost(item.id, `${item.author?.username}`)
              }
              cursor="pointer"
            >
              <PostCard post={item} />
            </Card>
          </Box>
        ))}
    </div>
  );
}

export default withAuth(Home);
