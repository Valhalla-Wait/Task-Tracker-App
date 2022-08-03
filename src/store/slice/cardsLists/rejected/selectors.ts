import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.rejectedList;

export const data = createSelector(selectSelf, (state) => state.data.data);

export const pagination = createSelector(selectSelf, (state) => state.data.pagination);

export const itemsTotal = createSelector(selectSelf, (state) => state.data.pagination.items_total);

export const sort = createSelector(selectSelf, (state) => state.sort);

export const error = createSelector(selectSelf, (state) => state.error);

export const status = createSelector(selectSelf, (state) => state.status);
