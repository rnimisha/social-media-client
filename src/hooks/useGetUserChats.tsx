import { getUserChatSerivce } from '@/common/services';
import { ChatType } from '@/common/types';
import { useAppSelector } from '@/store/hook';
import { useQuery } from '@tanstack/react-query';

type Props = {
  onSuccess?: (data: ChatType[]) => void;
  onError?: (err: unknown) => void;
};

const useGetUserChats = ({ onSuccess, onError }: Props) => {
  const { username } = useAppSelector((state) => state.user);
  return useQuery<ChatType[], Error>(
    ['getUserChat', username],
    () => getUserChatSerivce(),
    {
      onSuccess,
      onError,
    }
  );
};

export default useGetUserChats;
