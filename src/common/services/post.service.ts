import apiClient from '@/common/api/apiClient';
import { FeedPostType } from '@/common/types';
import { getErrorResponse } from '@/common/utils';
import { AxiosError } from 'axios';

type Props = {
  username: string;
  postid: number;
};
export const getSinglePost = async ({
  username,
  postid,
}: Props): Promise<FeedPostType> => {
  try {
    const resp = await apiClient.get(`/post/${username}/${postid}`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export default getSinglePost;
