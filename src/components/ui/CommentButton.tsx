import { Button } from '@chakra-ui/react';
import { FaRegComment } from 'react-icons/fa';

type PropsType = {
  commentCount: number;
};
function CommentButton({ commentCount }: PropsType) {
  return (
    <Button flex="1" variant="ghost" leftIcon={<FaRegComment />}>
      {commentCount}
    </Button>
  );
}

export default CommentButton;
