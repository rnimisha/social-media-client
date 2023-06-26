import apiClient from '@/common/api/apiClient';

import { AuthType, LoginType } from '../types';

export const loginService = async (data: LoginType): Promise<AuthType> => {
  const resp = await apiClient.post('/auth/login', data);
  return resp.data;
};
export default loginService;
