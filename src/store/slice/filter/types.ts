import { StatusesTypes, Types } from 'store';

export type FilterReducerType = {
  filters: Types.CardListFetchParamsType;
  status: StatusesTypes.statusesId[];
};
