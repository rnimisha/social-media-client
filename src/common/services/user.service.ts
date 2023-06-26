import apiClient from '@/common/api/apiClient';
import { UserDetailType } from '@/common/types';
import { getErrorResponse } from '@/common/utils';
import { AxiosError } from 'axios';

export const getUserDetailService = async (
  username: string
): Promise<UserDetailType> => {
  try {
    const resp = await apiClient.get(`/profile/${username}`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export default getUserDetailService;
