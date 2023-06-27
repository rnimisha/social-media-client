import { followUserService } from '@/common/services';

import { useMutation } from '@tanstack/react-query';

type PropsType = {
  onError?: (err: unknown) => void;
};
const useFollow = ({ onError }: PropsType) =>
  useMutation(followUserService, { onError });

export default useFollow;
