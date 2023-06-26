import PostCard from '@/components/PostCard';
import SingleComment from '@/components/SingleComment';
import CommentForm from '@/components/form/CommentForm';
import useGetPost from '@/hooks/useGetPost';
import { useAppSelector } from '@/store/hook';
import { Box, Card } from '@chakra-ui/react';

import { useParams } from 'react-router-dom';

function SinglePost() {
  const { username, postid } = useParams();
  const user = useAppSelector((state) => state.user);

  const { data } = useGetPost({
    postid: Number(postid),
    username: `${username}`,
  });

  return (
    <div>
      {username}

      {data !== undefined && data.author && (
        <Card maxW="2xl">
          <PostCard post={data} />
          <Box>
            <CommentForm userId={user.id} postId={data.id} />
            <Box py="10px" px="20px">
              {data.comments.length > 0 &&
                data.comments.map((comment) => (
                  <SingleComment comment={comment} key={comment.id} />
                ))}
            </Box>
          </Box>
        </Card>
      )}
    </div>
  );
}

export default SinglePost;
