import { updateProfileService } from '@/common/services';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { updateUserDetails } from '@/features/userSlice';
import useGetProfileDetail from './useGetProfileDetail';

type PropsType = {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
};
const useUpdateProfile = ({ onError, onSuccess }: PropsType) => {
  const dispatch = useAppDispatch();
  const currUser = useAppSelector((state) => state.user);

  const { refetch } = useGetProfileDetail({ username: currUser.username });

  return useMutation(updateProfileService, {
    onSuccess: (data) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updatedAt, ...others } = data;

      dispatch(updateUserDetails(others));

      refetch();
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
};

export default useUpdateProfile;
