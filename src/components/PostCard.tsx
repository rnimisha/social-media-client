import { useEffect, useState } from 'react';
import { FeedPostType } from '@/common/types';
import { BASEURL } from '@/constants';
import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Heading,
  CardBody,
  CardFooter,
  Box,
  Text,
  Image,
} from '@chakra-ui/react';

import LikeButton from './ui/LikeButton';
import CommentButton from './ui/CommentButton';
import ImageSlider from './ui/ImageSlider';

type PropsType = {
  post: FeedPostType;
};
function PostCard({ post }: PropsType) {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    const likes = post.likes.length;
    const comments = post.comments.length;

    setLikeCount(likes);
    setCommentCount(comments);
  }, []);

  return (
    <Card maxW="2xl">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name={post.author?.name}
              src={
                post.author?.profilePic &&
                `${BASEURL}/uploads/profile/${post.author.profilePic}`
              }
            />

            <Box>
              <Heading size="sm">{post.author?.name}</Heading>
              <Text>{post.author?.username}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Text>{post.description}</Text>
      </CardBody>

      {/* {post.images.length > 0 && (
        <Image
          objectFit="cover"
          src={`${BASEURL}/${post.images[0].basename}`}
          alt="Chakra UI"
        />
      )} */}

      {post.images.length > 0 && <ImageSlider images={post.images} />}

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <LikeButton likeCount={likeCount} isLiked />
        <CommentButton commentCount={commentCount} />
      </CardFooter>
    </Card>
  );
}

export default PostCard;
