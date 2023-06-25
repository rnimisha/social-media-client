import { loginService } from '@/common/services/';
import { AuthType, MutOpt } from '@/common/types';
import { useMutation } from '@tanstack/react-query';

const useLogin = (opt?: MutOpt<AuthType>) => useMutation(loginService, opt);

export default useLogin;
