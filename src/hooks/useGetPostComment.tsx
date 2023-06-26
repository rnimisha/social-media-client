import { getCommentByPostService } from '@/common/services';
import { CommentType } from '@/common/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  postid: number;
  onSuccess?: (data: CommentType[]) => void;
  onError?: (err: unknown) => void;
};

const useGetPostComment = ({ postid, onSuccess, onError }: Props) =>
  useQuery<CommentType[], Error>(
    ['getPostComment', postid],
    () => getCommentByPostService(postid),
    {
      onSuccess,
      onError,
    }
  );

export default useGetPostComment;
