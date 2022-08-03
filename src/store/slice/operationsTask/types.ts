import { Types } from 'store';

export type CreateTaskReducerType = {
  data: Types.TaskCardType[];
  status: Types.ReducerStatusType;
  error: string;
};

export type TaskResponseType = {
  pagination: Types.Pagination;
  data: Types.TaskCardType[];
};
