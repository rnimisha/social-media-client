import { getAllFollowings } from '@/common/services';
import { FollowingType } from '@/common/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  username: string;
  onSuccess?: (data: FollowingType[]) => void;
  onError?: (err: unknown) => void;
};

const useGetFollowings = ({ username, onSuccess, onError }: Props) =>
  useQuery<FollowingType[], Error>(
    ['getAllFollowings', username],
    () => getAllFollowings(username),
    {
      onSuccess,
      onError,
    }
  );

export default useGetFollowings;
