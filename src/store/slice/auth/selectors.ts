import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store/rootReducer';

const selectSelf = (state: RootStateType) => state.auth;

export const authTokenSelector = createSelector(selectSelf, (authState) => authState.token);

export const authErrSelector = createSelector(selectSelf, (authState) => authState.error);

export const authStatusSelector = createSelector(selectSelf, (authState) => authState.status);
