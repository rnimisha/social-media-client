import apiClient from '@/common/api/apiClient';

import { LoginType, TokenType } from '../types';

export const loginService = async (data: LoginType): Promise<TokenType> => {
  const resp = await apiClient.post('auth/login', data);
  return resp.data;
};
export default loginService;
