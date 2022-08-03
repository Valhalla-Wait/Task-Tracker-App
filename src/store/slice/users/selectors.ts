import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.users;

export const usersSelector = createSelector(selectSelf, (usersState) => usersState.data);

export const usersErrSelector = createSelector(selectSelf, (usersState) => usersState.error);

export const usersStatusSelector = createSelector(selectSelf, (usersState) => usersState.status);
