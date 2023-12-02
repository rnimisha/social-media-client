import withAuth from '@/common/hoc/withAuth';
import { getUserToFollowService } from '@/common/services';
import { FeedPostType, UserDetailType } from '@/common/types';
import { parseError } from '@/common/utils';
import MiniProfileCard from '@/components/MiniProfileCard';
import PostCard from '@/components/PostCard';
import AddPostForm from '@/components/form/AddPostForm';
import AppHeading from '@/components/ui/AppHeading';
import { setUserDetails } from '@/features/userSlice';
import useFeedPost from '@/hooks/useFeedPost';
import useGetUserDetail from '@/hooks/useUserDetail';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Box, Card, Divider, Spinner, useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

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

  useGetUserDetail({
    username: username || '',
    onSuccess: onGetUserDetailSuccess,
    onError: onGetUserDetailError,
  });

  // -------------------- feed posts --------------------------------
  const {
    data: feedPosts,
    isLoading: isFeedPostLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useFeedPost({
    onError: onGetUserDetailError,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // ------------------- people to follow ---------------------------
  const { data: peopleToFollow } = useQuery(
    ['getPeopleToFollow'],
    getUserToFollowService
  );

  if (isFeedPostLoading) {
    return <Spinner mt={3} />;
  }

  const navigateSinglePost = (id: number, uname: string) => {
    navigate(`/post/${uname}/${id}`);
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <Box flex={2} w="100%">
        <Card p={2}>
          <AddPostForm />
        </Card>

        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasNextPage}
          loader={<Spinner mt={3} />}
        >
          {feedPosts &&
            feedPosts.pages.map((page) =>
              page.map((item: FeedPostType) => (
                <Box key={item.id} mt="20px">
                  <Card
                    onClick={() =>
                      navigateSinglePost(item.id, `${item.author?.username}`)
                    }
                    cursor="pointer"
                  >
                    <PostCard post={item} />
                  </Card>
                </Box>
              ))
            )}
        </InfiniteScroll>
      </Box>
      <Box
        flex={1}
        display={{
          base: 'none',
          sm: 'none',
          md: 'none',
          lg: 'none',
          xl: 'block',
        }}
        ml="10px"
        height="90vh"
        width="80%"
        marginLeft="2%"
      >
        <Card overflowY="scroll" p="20px" w="90%" ml="5%" textAlign="center">
          <AppHeading text="Connect with People" fontsize="1.5rem" />
          <Divider my="10px" borderColor="blackAlpha.500" />
          {peopleToFollow?.map((item) => (
            <MiniProfileCard key={item.id} user={item} />
          ))}
        </Card>
      </Box>
    </Box>
  );
}

export default withAuth(Home);
