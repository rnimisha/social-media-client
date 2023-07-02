import { AxiosError } from 'axios';
import { getErrorResponse } from '../utils';
import { ChatType } from '../types';
import apiClient from '../api/apiClient';
import { socket } from '../api';

export const getUserChatSerivce = async (): Promise<ChatType[]> => {
  try {
    const resp = await apiClient.get(`/chat/user`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export const getMessagesByChatId = async (
  chatId: number
): Promise<ChatType> => {
  try {
    const resp = await apiClient.get(`/chat/chat/${chatId}`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export const sendMessageService = async (
  content: string,
  chatId: number,
  senderId: number
) => {
  socket.emit('createMessage', {
    content,
    senderId,
    chatId,
  });
};
