import PostCard from '@/components/PostCard';
import SingleComment from '@/components/SingleComment';
import CommentForm from '@/components/form/CommentForm';
import BreadCrumb from '@/components/layout/BreadCrumb';
import useGetPost from '@/hooks/useGetPost';
import { useAppSelector } from '@/store/hook';
import { Box, Card, Divider } from '@chakra-ui/react';
import { Fragment } from 'react';

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
      <BreadCrumb />
      {data !== undefined && data.author && (
        <Card w="80%" ml="10%">
          <PostCard post={data} />
          <Box>
            <CommentForm userId={user.id} postId={data.id} />
            <Box py="10px" px="20px">
              {data.comments.length > 0 &&
                data.comments.map((comment) => (
                  <Fragment key={comment.id}>
                    <SingleComment comment={comment} />
                    <Divider
                      mt="8px"
                      orientation="horizontal"
                      borderColor="blackAlpha.200"
                    />
                  </Fragment>
                ))}
            </Box>
          </Box>
        </Card>
      )}
    </div>
  );
}

export default SinglePost;
