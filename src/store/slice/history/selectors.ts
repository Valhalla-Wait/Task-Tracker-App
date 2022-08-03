import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.history;

export const historySelector = createSelector(selectSelf, (historyState) => historyState.data);

export const historyErrSelector = createSelector(selectSelf, (historyState) => historyState.error);

export const historyStatusSelector = createSelector(
  selectSelf,
  (historyState) => historyState.status,
);
