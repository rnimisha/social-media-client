import { getProfileDetail } from '@/common/services';
import { ProfileType } from '@/common/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  username: string;
  onSuccess?: (data: ProfileType) => void;
  onError?: (err: unknown) => void;
};

const useGetProfileDetail = ({ username, onSuccess, onError }: Props) =>
  useQuery<ProfileType, Error>(
    ['getSinglePost', username],
    () => getProfileDetail({ username }),
    {
      onSuccess,
      onError,
    }
  );

export default useGetProfileDetail;
