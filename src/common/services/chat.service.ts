import { AxiosError } from 'axios';
import { getErrorResponse } from '../utils';
import { ChatType } from '../types';
import apiClient from '../api/apiClient';

export const getUserChatSerivce = async (): Promise<ChatType[]> => {
  try {
    const resp = await apiClient.get(`/chat/user`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export default getUserChatSerivce;
