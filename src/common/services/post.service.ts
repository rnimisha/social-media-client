import apiClient from '@/common/api/apiClient';
import { FeedPostType, NewPostType } from '@/common/types';
import { getErrorResponse } from '@/common/utils';
import { AxiosError } from 'axios';

type SinglePostProps = {
  username: string;
  postid: number;
};
export const getSinglePost = async ({
  username,
  postid,
}: SinglePostProps): Promise<FeedPostType> => {
  try {
    const resp = await apiClient.get(`/post/${username}/${postid}`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

type UserPostProps = {
  username: string;
};

export const getUserAllPost = async ({
  username,
}: UserPostProps): Promise<FeedPostType[]> => {
  try {
    const resp = await apiClient.get(`/post/${username}`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export const addNewPost = async (data: FormData): Promise<NewPostType> => {
  try {
    const resp = await apiClient.post(`/post`, data);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};
