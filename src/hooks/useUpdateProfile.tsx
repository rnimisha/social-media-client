import { updateProfileService } from '@/common/services';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/hook';
import { updateUserDetails } from '@/features/userSlice';

type PropsType = {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
};
const useUpdateProfile = ({ onError, onSuccess }: PropsType) => {
  const dispatch = useAppDispatch();

  return useMutation(updateProfileService, {
    onSuccess: (data) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updatedAt, ...others } = data;
      dispatch(updateUserDetails(others));
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
  });
};

export default useUpdateProfile;
