import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddCommentType } from '@/common/types';
import { AiOutlineSend } from 'react-icons/ai';
import useAddComment from '@/hooks/useAddComment';
import { parseError } from '@/common/utils';

type PropsType = {
  userId: number;
  postId: number;
};
function CommentForm({ userId, postId }: PropsType) {
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm<AddCommentType>({
    defaultValues: {
      userId,
      description: '',
      postId,
    },
  });

  const onSubmitError = (error: unknown) => {
    const err = parseError(error);
    toast({
      title: err.error || 'Unexpected Error',
      description: err.message,
      status: 'error',
      position: 'top-right',
      isClosable: true,
    });
  };

  const { mutate: addComment } = useAddComment({ onError: onSubmitError });

  const submitComment: SubmitHandler<AddCommentType> = (data) => {
    addComment(data);
    reset({ userId, description: '', postId });
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
