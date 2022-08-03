import { PrioritiesTypes, StatusesTypes } from 'store';
import { initialState } from './slice';
import { FilterReducerType } from './types';

export const setSearchAction = (
  state: FilterReducerType,
  action: {
    payload: string;
    type: string;
  },
) => ({ ...state, filters: { ...state.filters, search: action.payload } });

export const removeSearchAction = ({
  status,
  filters: { search, ...rest },
}: FilterReducerType) => ({
  status,
  filters: { ...rest },
});

export const setMembersAction = (
  state: FilterReducerType,
  action: {
    payload: string[];
    type: string;
  },
) => ({ ...state, filters: { ...state.filters, assign_user_id: action.payload } });

export const removeMembersAction = ({
  status,
  filters: { assign_user_id, ...rest },
}: FilterReducerType) => ({
  status,
  filters: { ...rest },
});

export const setStatusAction = (
  state: FilterReducerType,
  action: {
    payload: StatusesTypes.statusesId[];
    type: string;
  },
) => ({ ...state, status: action.payload });

export const setTagsAction = (
  state: FilterReducerType,
  action: {
    payload: string[];
    type: string;
  },
) => ({ ...state, filters: { ...state.filters, tag_id: action.payload } });

export const removeTagsAction = ({ status, filters: { tag_id, ...rest } }: FilterReducerType) => ({
  status,
  filters: { ...rest },
});

export const setAttachmentAction = (state: FilterReducerType) => ({
  ...state,
  filters: { ...state.filters, storage_files_gte: 1 },
});

export const removeAttachmentAction = ({
  status,
  filters: { storage_files_gte, ...rest },
}: FilterReducerType) => ({
  status,
  filters: { ...rest },
});

export const setPrioritiesAction = (
  state: FilterReducerType,
  action: {
    payload: PrioritiesTypes.prioritiesId[];
    type: string;
  },
) => ({ ...state, filters: { ...state.filters, priority_id: action.payload } });

export const removePrioritiesAction = ({
  status,
  filters: { priority_id, ...rest },
}: FilterReducerType) => ({
  status,
  filters: { ...rest },
});

export const setAssignToMeAction = (state: FilterReducerType) => ({
  ...state,
  filters: { ...state.filters, assigned_to_me: true },
});

export const removeAssignToMeAction = ({
  status,
  filters: { assigned_to_me, ...rest },
}: FilterReducerType) => ({
  status,
  filters: { ...rest },
});

export const resetFiltersAction = () => initialState;

export const setFiltersFromLocalStorageAction = () =>
  JSON.parse(localStorage.getItem('filters') ?? JSON.stringify(initialState));

export const setAllFiltersAction = (
  _: FilterReducerType,
  action: { payload: FilterReducerType; type: string },
) => action.payload;
