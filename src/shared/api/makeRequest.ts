/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Helpers } from 'shared';
import { NetworkError } from './errors';
import { TApiResponse } from './types';

export const makeRequest = <T>({
  baseURL = process.env.REACT_APP_TASK_BACKEND_URL,
  url,
  method = 'get',
  headers = {},
  params = {},
  responseType = 'json',
  data = {},
  onUploadProgress,
}: AxiosRequestConfig): TApiResponse<T> => {
  const token = Helpers.Cookies.getTokenCookies();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios
    .request({
      baseURL,
      url,
      method,
      headers,
      params,
      responseType,
      data,
      onUploadProgress,
    })
    .catch(async ({ response }: AxiosError) => {
      if (response) {
        const {
          data: { message },
          status,
        } = response;
        throw new NetworkError({ message, status });
      } else {
        throw new NetworkError({
          message: 'Соединение с сервером отсутствует',
          status: 502,
        });
      }
    });
};
