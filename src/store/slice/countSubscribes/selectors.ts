import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.countSubscribes;

export const countSubscribesSelector = createSelector(
  selectSelf,
  (countSubscribesState) => countSubscribesState.data.data,
);

export const ountSubscribesErrSelector = createSelector(
  selectSelf,
  (countSubscribesState) => countSubscribesState.error,
);

export const ountSubscribesStatusSelector = createSelector(
  selectSelf,
  (countSubscribesState) => countSubscribesState.status,
);
