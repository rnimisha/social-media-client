import apiClient from '@/common/api/apiClient';
import { FeedPostType } from '@/common/types';
import { getErrorResponse } from '@/common/utils';
import { AxiosError } from 'axios';

export const getFeedPosts = async (): Promise<FeedPostType[]> => {
  try {
    const resp = await apiClient.get('/feed');
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export default getFeedPosts;
