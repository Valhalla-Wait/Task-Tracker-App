import { Types } from 'store';

export type HistoryReducerType = {
  data: Datum[];
  status: Types.ReducerStatusType;
  error: string;
};

export type HistoryResponseType = {
  pagination: Types.PaginationType;
  data: Datum[];
};

export type Datum = {
  history_command_id: string;
  command_code: string;
  command_name: string;
  created: string;
  user: User;
  params: Params;
  relations: RelationElement[];
};

export type Params = {
  assign_user?: AssignUser;
  ask_role?: TaskRole;
  complete?: boolean;
  check_list_item?: After | null;
  check_list?: CheckList;
  tag?: Tag;
  priority?: Priority;
  title?: string;
  task?: Task;
  message?: string;
  after?: After | null;
  status?: Status;
  storage_file?: StorageFile;
};

export type AssignUser = {
  user_id: string;
  name: string;
};

export type TaskRole = {
  task_role_id: string;
  name: string;
};

export type Tag = {
  task_tag_id: string;
  name: string;
  color: string;
};

export type Priority = {
  task_priority_id: string;
  name: string;
};

export type After = {
  check_list_item_id: string;
  message: string;
};

export type CheckList = {
  check_list_id: string;
  title: string;
};

export type Status = {
  task_status_id: string;
  name: string;
};

export type StorageFile = {
  storage_file_id: string;
  type: string;
  name_original: string;
  content_type: string;
  size: number;
  uploaded: boolean;
  image_thumbnail: null;
  image_width: null;
  image_height: null;
  modifications: any[];
};

export type Task = {
  task_id: string;
  title: string;
};

export type RelationElement = {
  relation_type: string;
  relation_id: string;
  relation: RelationRelation;
};

export type RelationRelation = {
  relation_id: string;
  title: string;
};

export type User = {
  user_id: string;
  name: string;
  logo: string;
};
