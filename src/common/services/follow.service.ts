import apiClient from '@/common/api/apiClient';
import { AxiosError } from 'axios';
import { FollowerType, FollowingType } from '@/common/types';
import { getErrorResponse } from '@/common/utils';

export const getAllFollowings = async (
  username: string
): Promise<FollowingType[]> => {
  try {
    const resp = await apiClient.get(`/follow/${username}/following`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export const getAllFollowers = async (
  username: string
): Promise<FollowerType[]> => {
  try {
    const resp = await apiClient.get(`/follow/${username}/follower`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export const followUserService = async (data: {
  userToFollowId: number;
}): Promise<{ msg: string }> => {
  try {
    const resp = await apiClient.post(`/follow`, data);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export const unFollowUserService = async (
  id: number
): Promise<{ msg: string }> => {
  try {
    const resp = await apiClient.delete(`/follow/${id}`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};
