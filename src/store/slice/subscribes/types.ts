export type ReducerType = {
  data: SubscribesResponseType;
  status: 'loading' | 'success' | 'fail' | null;
  error: string;
};

export type SubscribesResponseType = {
  pagination: Pagination;
  data: Datum[];
};

export type ChangeSubscribesResponseType = {};

export type Datum = {
  subscribe_notify_id: string;
  viewed: boolean;
  history_command: HistoryCommand;
};

export type HistoryCommand = {
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
  task_role?: TaskRole;
  check_list_item?: CheckListItem | null;
  check_list?: CheckList;
  storage_file?: StorageFile;
  tag?: Tag;
  task?: Task;
  status?: Status;
  priority?: Priority;
  message?: string;
  complete?: boolean;
  exec_stop?: string;
  title?: string;
};

export type StorageFile = {
  storage_file_id: string;
  type: string;
  name_original: string;
  content_type: string;
  size: number;
  uploaded: boolean;
  image_thumbnail: string | null;
  image_width: number | null;
  image_height: number | null;
  modifications: StorageFile[];
};

export type CheckList = {
  check_list_id: string;
  title: string;
};

export type CheckListItem = {
  check_list_item_id: string;
  message: string;
};

export type TaskRole = {
  task_role_id: string;
  name: string;
};

export type AssignUser = {
  user_id: string;
  name: string;
};

export type Priority = {
  task_priority_id: string;
  name: string;
};

export type Status = {
  task_status_id: string;
  name: string;
};

export type Tag = {
  task_tag_id: string;
  name: string;
  color: string;
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

export type Pagination = {
  items_count: number;
  items_total: number;
  per_page: number;
  page_current: number;
  page_total: number;
};
