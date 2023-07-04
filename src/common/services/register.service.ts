import apiClient from '@/common/api/apiClient';

import { AxiosError } from 'axios';
import { AuthType, RegsiterReqType } from '../types';
import { getErrorResponse } from '../utils';

export const registerService = async (
  data: RegsiterReqType
): Promise<AuthType> => {
  try {
    const resp = await apiClient.post('/auth/register', data);
    return resp.data;
  } catch (error) {
    const err = getErrorResponse(error as AxiosError);
    throw new Error(JSON.stringify(err));
  }
};

export default registerService;
