import { getMessagesByChatId } from '@/common/services';
import { ChatType } from '@/common/types';
import { useQuery } from '@tanstack/react-query';

type Props = {
  chatId: number;
  onSuccess?: (data: ChatType) => void;
  onError?: (err: unknown) => void;
};

const useGetChatMessages = ({ chatId, onSuccess, onError }: Props) =>
  useQuery<ChatType, Error>(
    ['getChatMessages', chatId],
    () => getMessagesByChatId(chatId),
    {
      onSuccess,
      onError,
    }
  );

export default useGetChatMessages;
