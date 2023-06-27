import { getAllFollowers } from '@/common/services';
import { FollowerType } from '@/common/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  username: string;
  onSuccess?: (data: FollowerType[]) => void;
  onError?: (err: unknown) => void;
};

const useGetFollowers = ({ username, onSuccess, onError }: Props) =>
  useQuery<FollowerType[], Error>(
    ['getAllFollowers', username],
    () => getAllFollowers(username),
    {
      onSuccess,
      onError,
    }
  );

export default useGetFollowers;
