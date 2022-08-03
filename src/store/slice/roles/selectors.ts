import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.roles;

export const rolesSelector = createSelector(selectSelf, (rolesState) => rolesState.data);

export const rolesErrSelector = createSelector(selectSelf, (rolesState) => rolesState.error);

export const rolesStatusSelector = createSelector(selectSelf, (rolesState) => rolesState.status);
