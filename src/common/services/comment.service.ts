import apiClient from '@/common/api/apiClient';
import { AddCommentType, CommentType } from '@/common/types';
import { getErrorResponse } from '@/common/utils';
import { AxiosError } from 'axios';

export const addCommentService = async (
  data: AddCommentType
): Promise<CommentType> => {
  try {
    const resp = await apiClient.post('/comment', data);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export const getCommentByPostService = async (
  postid: number
): Promise<CommentType[]> => {
  try {
    const resp = await apiClient.get(`/comment/post/${postid}`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};
