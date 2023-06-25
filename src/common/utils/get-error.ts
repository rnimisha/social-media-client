import { AxiosError } from 'axios';
import { ErrorResponse } from '@/common/types';

export const getErrorResponse = (error: AxiosError): ErrorResponse => {
  let err: ErrorResponse = {
    message: 'Unexpected Error',
    error: 'Error',
    statusCode: 500,
  };

  if (error?.response?.data) {
    const data = error.response.data as ErrorResponse;

    const message = data.message || 'Unexpected Error';
    const errorMessage = data.error || 'Unexpected Server Error';
    const statusCode = data.statusCode || 500;

    err = {
      message,
      error: errorMessage,
      statusCode,
    };
  }

  return err;
};

export default getErrorResponse;
