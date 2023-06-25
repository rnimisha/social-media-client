import { Button } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type PropsType = {
  likeCount: number;
  isLiked: boolean;
  // eslint-disable-next-line react/require-default-props
  action?:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
};
function LikeButton({ likeCount, isLiked, action }: PropsType) {
  return (
    <Button
      onClick={action}
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
