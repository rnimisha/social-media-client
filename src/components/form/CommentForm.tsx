import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddCommentType } from '@/common/types';
import { AiOutlineSend } from 'react-icons/ai';

type PropsType = {
  userId: number;
  postId: number;
};
function CommentForm({ userId, postId }: PropsType) {
  const { register, handleSubmit } = useForm<AddCommentType>({
    defaultValues: {
      userId,
      description: '',
      postId,
    },
  });

  const submitComment: SubmitHandler<AddCommentType> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(submitComment)} noValidate>
      <FormControl mt="10px" p="20px">
        <InputGroup>
          <Input
            py="10px"
            placeholder="Enter comment...."
            {...register('description')}
          />
          <InputRightElement>
            <Button type="submit" variant="unstyled">
              <AiOutlineSend />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  );
}

export default CommentForm;
