import { Types } from 'store';
import { TaskType } from '../cardsLists/types';

export type ReducerType = {
  data: TagType[];
  status: Types.ReducerStatusType;
  error: string;
};

export type TagType = {
  task_tag_id: string;
  name: string;
  color: TagsColorType;
  created?: string;
  updated?: string;
};

export type TaskTagsType = {
  task_to_tag_id: string;
  task: TaskType;
  task_tag: TagType;
};

export type TagsColorType =
  | 'error'
  | 'success'
  | 'pink'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'cyan'
  | 'green'
  | 'blue'
  | 'purple'
  | 'geekblue'
  | 'magenta'
  | 'volcano'
  | 'gold'
  | 'lime'
  | 'processing'
  | 'default'
  | 'warning';

export type TagsFetchResponseType = {
  pagination: Types.Pagination;
  data: TagType[];
};

export type TagCERequestBodyType = {
  // CE -Create/Edit
  name: string;
  color: TagsColorType;
};

export type TagResponseType = {
  data: TagType;
};

export type TagAssignResponseType = {
  relation: TagToTaskRelationType;
  data: Types.TaskCardType;
};

type TagToTaskRelationType = {
  task_to_tag_id: string;
  task_id: string;
  task_tag_id: string;
  created: string;
  updated: string;
};
