/* eslint-disable no-unused-vars */
import { Types } from 'store';

/* eslint-disable no-shadow */
export type StatusesReducerType = {
  data: TaskStatusType[];
  status: Types.ReducerStatusType;
  error: string;
};

export enum statusesId {
  created = 'cbb7199e-cb25-4dce-bf4e-24a8a5e07ef2',
  inWork = '372d63ff-3ae3-4be2-a606-38940d7f8c8f',
  completed = '8536592a-7340-4e10-ac4b-a280652c9310',
  notCompleted = '599f5d03-1ef0-4a5b-a18c-33a4f44c4610',
  rejected = '4658859a-32a6-4206-838a-c0064f147299',
}

export type TaskStatusType = {
  task_status_id: statusesId;
  name: string;
  name_group: string;
  form_result_required: boolean;
  created: string;
  updated: string;
};

type PaginationType = {
  items_count: number;
  items_total: number;
  per_page: number;
  page_current: number;
  page_total: number;
};

export type StatusResponseType = {
  pagination: PaginationType;
  data: TaskStatusType[];
};
