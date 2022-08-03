import { Types } from 'store';
import { ReducerStatusType } from '../cardsLists/types';

export type ReducerType = {
  data: Types.TaskCardDetailType;
  status: ReducerStatusType;
  checkListStatus: ReducerStatusType;
  titleStatus: string;
  tagStatus: ReducerStatusType;
  error: string;
  currentTaskId: string;
};
export type OneTaskFetchResponseType = {
  data: Types.TaskCardDetailType;
};

export type CheckListResponseType = {
  data: Types.TaskCheckListType;
};

export type CheckListItemResponseType = {
  data: Types.CheckListItemType;
};

export type CheckListAssignResponseType = {
  relation: CheckListToTaskRelationType;
  data: Types.TaskCardDetailType;
};

type CheckListToTaskRelationType = {
  task_to_check_list_id: string;
  task_id: string;
  check_list_id: string;
  created: string;
  updated: string;
};
