import apiClient from '@/common/api/apiClient';
import { ProfileType, UpdateProfileResType } from '@/common/types';
import { getErrorResponse } from '@/common/utils';
import { AxiosError } from 'axios';

type Props = {
  username: string;
};
export const getProfileDetail = async ({
  username,
}: Props): Promise<ProfileType> => {
  try {
    const resp = await apiClient.get(`/profile/${username}`);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

type UpdateProfileProps = {
  data: FormData;
  username: string;
};
export const updateProfileService = async ({
  data,
  username,
}: UpdateProfileProps): Promise<UpdateProfileResType> => {
  try {
    const resp = await apiClient.put(`/profile/${username}`, data);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};
