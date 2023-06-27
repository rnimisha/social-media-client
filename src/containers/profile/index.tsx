import withAuth from '@/common/hoc/withAuth';
import PostCard from '@/components/PostCard';
import ProfileCard from '@/components/ProfileCard';
import useGetProfileDetail from '@/hooks/useGetProfileDetail';
import useGetUserPosts from '@/hooks/useGetUserPosts';
import { Box, Card } from '@chakra-ui/react';

import { useParams, useNavigate } from 'react-router-dom';

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const { data: profileDetails, isLoading: isPostDetailLoading } =
    useGetProfileDetail({
      username: `${username}`,
    });

  const { data: userPosts } = useGetUserPosts({ username: `${username}` });

  if (isPostDetailLoading) return <div>Loading...</div>;

  const navigateSinglePost = (id: number, uname: string) => {
    navigate(`/post/${uname}/${id}`);
  };

  return (
    <div>
      {profileDetails && <ProfileCard userDetail={profileDetails} />}
      {/* <Card p="20px">My Posts</Card> */}
      {userPosts &&
        userPosts.length > 0 &&
        userPosts?.map((post) => (
          <Box key={post.id} mt="20px">
            <Card
              maxW="2xl"
              onClick={() =>
                navigateSinglePost(post.id, `${post.author?.username}`)
              }
              cursor="pointer"
            >
              <PostCard post={post} />
            </Card>
          </Box>
        ))}
    </div>
  );
}

export default withAuth(Profile);
