/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Types } from 'store';

export type PrioritiesReducerType = {
  data: TaskPriorityType[];
  status: Types.ReducerStatusType;
  error: string;
};

export enum prioritiesId {
  high = 'bd509d32-ecf1-4413-8d0b-e4e5e14d2aa3',
  medium = '389f4ff4-1637-4222-8f41-67beacd478ea',
  low = '04d1ab57-3e9d-435a-9dd2-8d0a86b0231b',
}

export type TaskPriorityType = {
  task_priority_id: prioritiesId;
  name: string;
  created?: string;
  updated?: string;
};

export type PriorityResponseType = {
  pagination: Types.Pagination;
  data: TaskPriorityType[];
};
