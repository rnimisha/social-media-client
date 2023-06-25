import withAuth from '@/common/hoc/withAuth';
import { UserDetailType } from '@/common/types';
import { parseError } from '@/common/utils';
import { setUserDetails } from '@/features/userSlice';
import useGetUserDetail from '@/hooks/useUserDetail';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useToast } from '@chakra-ui/react';

function Home() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.auth);

  const onGetUserDetailSuccess = (data: UserDetailType) => {
    dispatch(setUserDetails(data));
  };
  const onGetUserDetailError = (error: unknown) => {
    const err = parseError(error);
    toast({
      title: err.error || 'Unexpected Error',
      description: err.message,
      status: 'error',
      position: 'top-right',
      isClosable: true,
    });
  };

  const query = useGetUserDetail({
    username,
    onSuccess: onGetUserDetailSuccess,
    onError: onGetUserDetailError,
  });

  return <div>Home {}</div>;
}

export default withAuth(Home);
