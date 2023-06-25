import apiClient from '@/common/api/apiClient';
import { AxiosError } from 'axios';
import { getErrorResponse } from '../utils';

type Props = {
  postId: number;
};
// returns like id on success
export const likePostService = async (data: Props): Promise<{ id: number }> => {
  try {
    const resp = await apiClient.post('like', data);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};
export const unlikePostService = async (
  data: Props
): Promise<{ id: number }> => {
  try {
    const resp = await apiClient.post('like/unlike', data);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};
