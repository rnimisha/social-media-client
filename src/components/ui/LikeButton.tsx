import { Button } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type PropsType = {
  likeCount: number;
  isLiked: boolean;
};
function LikeButton({ likeCount, isLiked }: PropsType) {
  return (
    <Button
      flex="1"
      variant="ghost"
      leftIcon={
        isLiked ? <FaHeart style={{ color: 'tomato' }} /> : <FaRegHeart />
      }
    >
      {likeCount}
    </Button>
  );
}

export default LikeButton;
