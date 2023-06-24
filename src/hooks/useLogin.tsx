import { loginService } from '@/common/services/';
import { MutOpt, TokenType } from '@/common/types';
import { useMutation } from '@tanstack/react-query';

const useLogin = (opt?: MutOpt<TokenType>) => useMutation(loginService, opt);

export default useLogin;
