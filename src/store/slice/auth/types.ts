import { Types } from 'store';

export type ReducerType = {
  token: string;
  status: Types.ReducerStatusType;
  error: string;
};
