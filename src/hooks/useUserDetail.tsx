import { getUserDetailService } from '@/common/services';
import { UserDetailType } from '@/common/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  username: string;
  onSuccess?: (data: UserDetailType) => void;
  onError?: (err: unknown) => void;
};

const useGetUserDetail = ({ username, onSuccess, onError }: Props) =>
  useQuery<UserDetailType, Error>(
    ['getUserDetail', username],
    () => getUserDetailService(username),
    {
      onSuccess,
      onError,
    }
  );

export default useGetUserDetail;
