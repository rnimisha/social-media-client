/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseMutationOptions } from '@tanstack/react-query';

export type ApiServiceErr = any;
export type MutOpt<Response, TVariables = unknown> = UseMutationOptions<
  Response,
  ApiServiceErr,
  TVariables,
  unknown
>;
