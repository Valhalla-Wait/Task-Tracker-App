import { AxiosResponse } from 'axios';

export type TNetworkError = {
  status: number;
  message: string;
};

export type TApiResponse<T> = Promise<AxiosResponse<T>>;
