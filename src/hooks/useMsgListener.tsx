import { socket } from '@/common/api';
import { AppMessageType, ChatType } from '@/common/types';
import { useAppSelector } from '@/store/hook';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import useGetUserChats from './useGetUserChats';

type PropsType = {
  chatId: number;
};

const useMsgListener = ({ chatId }: PropsType) => {
  const currUser = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { refetch } = useGetUserChats({
    onSuccess: (data: ChatType[]) => {
      queryClient.setQueryData(['getUserChat', currUser.username], data);
    },
  });

  const messageListener = (newMsg: AppMessageType) => {
    const existingData: ChatType | undefined = queryClient.getQueryData([
      'getChatMessages',
      chatId,
    ]);

    if (existingData) {
      const updatedData = {
        ...existingData,
        messages: [...existingData.messages, newMsg],
      };
      queryClient.setQueryData(['getChatMessages', chatId], updatedData);

      refetch();
    }
  };

  useEffect(() => {
    socket?.on('receiveMessage', messageListener);
    return () => {
      socket?.off('receiveMessage', messageListener);
    };
  }, [chatId, messageListener]);
};

export default useMsgListener;
