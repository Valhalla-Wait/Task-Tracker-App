export type ReducerType = {
  data: SubscribesCountResponseType;
  status: 'loading' | 'success' | 'fail' | null;
  error: string;
};

export type SubscribesCountResponseType = {
  pagination: Pagination;
  data: Datum[];
};

export type Datum = {
  subscribe_id: string;
  command_code: null | string;
  relation_type: string;
  relation_id: string;
  created: string;
};

export type Pagination = {
  items_count: number;
  items_total: number;
  per_page: number;
  page_current: number;
  page_total: number;
};
