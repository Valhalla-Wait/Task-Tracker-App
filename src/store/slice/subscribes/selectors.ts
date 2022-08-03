import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.subscribes;

export const subscribesSelector = createSelector(
  selectSelf,
  (subscribesState) => subscribesState.data.data,
);

export const subscribesSelectorTrue = createSelector(selectSelf, (subscribesState) =>
  subscribesState.data.data.filter((el) => el.viewed === true),
);
export const subscribesSelectorFalse = createSelector(selectSelf, (subscribesState) =>
  subscribesState.data.data.filter((el) => el.viewed === false),
);

export const subscribesErrSelector = createSelector(
  selectSelf,
  (subscribesState) => subscribesState.error,
);

export const subscribesStatusSelector = createSelector(
  selectSelf,
  (subscribesState) => subscribesState.status,
);
