export type ReducerType = {
  data: ProfileType;
  status: 'loading' | 'success' | 'fail' | null;
  error: string;
};

export type ProfileType = {
  user_id: string;
  name: string;
  logo: string;
  permissions: [];
};

export type ProfileResponseType = {
  data: ProfileType;
};
