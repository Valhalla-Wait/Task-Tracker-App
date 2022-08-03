/* eslint-disable no-shadow */
import React from 'react';
import { TagsTypes, StatusesTypes, PrioritiesTypes } from 'store';

export type PaginationType = {
  items_count: number;
  items_total: number;
  per_page: number;
  page_current: number;
  page_total: number;
};

export enum sortMethods {
  date = 'date~DESC',
  title = 'title~ASC',
}

export type FetchTasksResponseType = {
  pagination: PaginationType;
  data: TaskCardType[];
};

export type TaskCardType = {
  task_id: string;
  title: string;
  description: string;
  exec_start: string | null;
  exec_stop: string | null;
  created: string;
  updated: string;
  form_available: boolean;
  status: StatusesTypes.TaskStatusType;
  priority: PrioritiesTypes.TaskPriorityType | null;
  roles: TaskRoleType[];
  tags: TaskTagType[];
  progress: TaskProgressType | null;
  storage_files_meta: TaskStorageFilesMetaType;
  permissions: string[];
};

export type TaskCardDetailType = {
  task_id: string;
  title: string;
  description: string;
  exec_start: string;
  exec_stop: string;
  created: string;
  updated: string;
  status: StatusesTypes.TaskStatusType;
  priority: PrioritiesTypes.TaskPriorityType | null;
  form: TaskFormType | null;
  form_available: boolean;
  form_result: null;
  roles: TaskRoleType[];
  tags: TaskTagType[];
  progress: TaskProgressType | null;
  check_lists: TaskCheckListType[];
  storage_files: TaskStorageFileType[];
  storage_files_meta: TaskStorageFilesMetaType;
  permissions: string[];
};

export type TaskFormType = {
  name: string;
  fields: FormFieldsType[];
};

export type TaskRoleType = {
  task_to_role_id: string;
  task: TaskType;
  task_role: RoleType;
  assign_user: UserType;
};

export type TaskTagType = {
  task_to_tag_id: string;
  task: TaskType;
  task_tag: TagsTypes.TagType;
};

export type TaskProgressType = {
  percent: number;
  completed: number;
  total: number;
};

export type TaskCheckListType = {
  check_list_id: string;
  title: string;
  created: string;
  updated: string;
  items?: CheckListItemType[];
};

export type TaskStorageFileType = {
  storage_file_id: string;
  type: string;
  name_original: string;
  content_type: string | null;
  size: number;
  uploaded: boolean;
  image_thumbnail: null;
  image_width: number | null;
  image_height: number | null;
  modifications: never[];
};

export type TaskStorageFilesMetaType = {
  total: number;
};

export type TaskType = {
  task_id: string;
};

export type RoleType = {
  task_role_id: string;
  name: string;
  name_group: string;
  max_user_assigned: number | null;
  is_author: boolean;
  created: string;
  updated: string;
};

export type UserType = {
  user_id: string;
  name: string;
  logo: string;
  color?: string;
  initials?: string;
  permissions?: (
    | 'task.create'
    | 'task.read'
    | 'task.update'
    | 'task.delete'
    | 'bpmn.instance.manager'
    | 'bpmn.template.manager'
    | 'bpmn.moderator'
  )[];
};

type FormFieldsType = {
  type: string;
  values: FormFieldValuesType[];
  field_name: string;
  field_label: string;
};

type FormFieldValuesType = {
  label: string;
  value: string;
};

export type StorageType = {
  data: TaskStorageFileType;
};

export type CheckListItemType = {
  check_list_item_id: string;
  message: string;
  complete: boolean;
  created: string;
  updated: string;
};

export type Pagination = {
  items_count: number;
  items_total: number;
  per_page: number;
  page_current: number;
  page_total: number;
};

export type ReducerStatusType = 'loading' | 'success' | 'fail' | null;

export type TasksListReducerType = {
  data: FetchTasksResponseType;
  sort: sortMethods;
  status: ReducerStatusType;
  error: string;
};

export type SortOptionsType = {
  listSort: sortMethods;
  taskStatus: StatusesTypes.statusesId;
  title: string;
};

export enum TitlesCards {
  incoming = 'Входящие',
  inWork = 'В работе',
  completed = 'Выполненные',
  notCompleted = 'Невыполненные',
  rejected = 'Отклоненные',
}

export enum RolesId {
  author = '4601c660-f319-4728-80a6-0aaac03f3842',
  observer = '25615bc6-9762-4578-b1d9-de28a059d682',
  executor = '4fca475d-488e-4261-8e60-44569071a038',
  responsible = '57a5360b-7c3b-4de0-b536-a5657ac7da32',
}

export type CardListFetchParamsType = {
  sort?: sortMethods;
  search?: string;
  assign_user_id?: string[];
  assigned_to_me?: boolean;
  storage_files_gte?: number;
  tag_id?: string[];
  role_id?: string[];
  role_id_for_me?: string[];
  priority_id?: string[];
  status_id?: string[];
  progress_gte?: number;
  relation_type?: string;
  relation_id?: string;
  page?: number;
  per_page?: number;
};
