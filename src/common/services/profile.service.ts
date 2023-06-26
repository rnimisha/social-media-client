import apiClient from '@/common/api/apiClient';
import { ProfileType } from '@/common/types';
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

export default getProfileDetail;
