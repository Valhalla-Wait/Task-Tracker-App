import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store/rootReducer';

const selectSelf = (state: RootStateType) => state.profile;

export const profileSelector = createSelector(selectSelf, (profileState) => profileState.data);

export const profileErrSelector = createSelector(selectSelf, (profileState) => profileState.error);

export const profileStatusSelector = createSelector(
  selectSelf,
  (profileState) => profileState.status,
);
