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
} from '@chakra-ui/react';
import moment from 'moment';

import { useAppSelector } from '@/store/hook';
import useLikePost from '@/hooks/useLikePost';
import useUnLikePost from '@/hooks/useUnlikePost';
import LikeButton from './ui/LikeButton';
import CommentButton from './ui/CommentButton';
import ImageSlider from './ui/ImageSlider';

type PropsType = {
  post: FeedPostType;
};
function PostCard({ post }: PropsType) {
  const user = useAppSelector((state) => state.user);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const checkIsLiked = () => {
    const data = post.likes.find((like) => like.userId === user.id);
    const liked = !!data;
    setIsLiked(liked);
  };

  useEffect(() => {
    const likes = post.likes.length;
    const comments = post.comments.length;

    setLikeCount(likes);
    setCommentCount(comments);
    checkIsLiked();
  }, [post]);

  const { mutate: likePost } = useLikePost();
  const { mutate: unlikePost } = useUnLikePost();

  const likeAction = () => {
    likePost({ postId: post.id });
  };
  const unLikeAction = () => {
    unlikePost({ postId: post.id });
  };

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
          <Text color="gray">{moment(post.createdAt).fromNow()}</Text>
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
        <LikeButton
          likeCount={likeCount}
          isLiked={isLiked}
          action={isLiked ? unLikeAction : likeAction}
        />
        <CommentButton commentCount={commentCount} />
      </CardFooter>
    </Card>
  );
}

export default PostCard;
