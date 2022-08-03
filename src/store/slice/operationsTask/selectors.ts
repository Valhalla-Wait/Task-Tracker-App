import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store/rootReducer';

const selectSelf = (state: RootStateType) => state.operationsTask;

export const createTaskSelector = createSelector(
  selectSelf,
  (createTaskState) => createTaskState.data,
);

export const createTaskErrSelector = createSelector(
  selectSelf,
  (createTaskState) => createTaskState.error,
);

export const createTaskStatusSelector = createSelector(
  selectSelf,
  (createTaskState) => createTaskState.status,
);
