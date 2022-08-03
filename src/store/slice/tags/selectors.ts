import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store/rootReducer';

const selectSelf = (state: RootStateType) => state.tags;

export const tagsSelector = createSelector(selectSelf, (tagsState) => tagsState.data);

export const tagsErrSelector = createSelector(selectSelf, (tagsState) => tagsState.error);

export const tagsStatusSelector = createSelector(selectSelf, (tagsState) => tagsState.status);
