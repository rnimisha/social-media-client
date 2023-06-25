import { ErrorResponse } from '@/common/types';

export const parseError = (error: unknown): ErrorResponse =>
  JSON.parse((error as Error).message) as ErrorResponse;

export default parseError;
