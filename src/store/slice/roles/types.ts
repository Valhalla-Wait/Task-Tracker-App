import { Types } from 'store';

export type RolesReducerType = {
  data: Types.RoleType[];
  status: Types.ReducerStatusType;
  error: string;
};

export type RolesResponseType = {
  pagination: Types.PaginationType;
  data: Types.RoleType[];
};
