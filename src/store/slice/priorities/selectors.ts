import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.priorities;

export const data = createSelector(selectSelf, (state) => state.data);

export const error = createSelector(selectSelf, (state) => state.error);

export const status = createSelector(selectSelf, (state) => state.status);

export const prioritiesSelectorOptions = createSelector(selectSelf, (prioritiesState) =>
  prioritiesState.data.map((item) => ({
    value: item.task_priority_id,
    label: item.name,
  })),
);
