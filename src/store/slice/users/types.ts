import { Types } from 'store';

/* eslint-disable no-shadow */
export type UsersReducerType = {
  data: Types.UserType[];
  status: Types.ReducerStatusType;
  error: string;
};

export type UsersResponseType = {
  pagination: Types.PaginationType;
  data: Types.UserType[];
};
