import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';
import { initialState } from './slice';

const selectSelf = (state: RootStateType) => state.filter;

export const allFilters = createSelector(selectSelf, (state) => state);

export const filters = createSelector(selectSelf, (state) => state.filters);

export const isAssignToMe = createSelector(selectSelf, (state) => !!state.filters.assigned_to_me);

export const searchString = createSelector(selectSelf, (state) => state.filters.search);

export const members = createSelector(selectSelf, (state) => state.filters.assign_user_id);

export const statuses = createSelector(selectSelf, (state) => state.status);

export const tags = createSelector(selectSelf, (state) => state.filters.tag_id);

export const isAttachment = createSelector(
  selectSelf,
  (state) => !!state.filters.storage_files_gte,
);

export const priorities = createSelector(selectSelf, (state) => state.filters.priority_id);

export const activeFiltersCount = createSelector(
  selectSelf,
  (state) =>
    Object.keys(state.filters).length + +(state.status.length !== initialState.status.length),
);
