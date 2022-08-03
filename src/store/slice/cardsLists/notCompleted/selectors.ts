import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.notCompletedList;

export const data = createSelector(selectSelf, (state) => state.data.data);

export const pagination = createSelector(selectSelf, (state) => state.data.pagination);

export const itemsTotal = createSelector(selectSelf, (state) => state.data.pagination.items_total);

export const sort = createSelector(selectSelf, (state) => state.sort);

export const error = createSelector(selectSelf, (state) => state.error);

export const NotCompletedListItemsCountSelector = createSelector(
  selectSelf,
  (notCompletedListState) => notCompletedListState.data.pagination.items_total,
);

export const NotCompletedListItemsCurrentSelector = createSelector(
  selectSelf,
  (incomingListState) => incomingListState.data.pagination.page_current,
);

export const userResponsibleSelector = createSelector(selectSelf, (completedListState) =>
  completedListState.data.data
    .map((el) => el.roles)
    .flat(1)
    .map((el) => ({
      id: el.assign_user.user_id,
      rol: el.task_role.name,
    }))
    .filter((el) => el.rol === 'Ответственный'),
);
export const userExecutorSelector = createSelector(selectSelf, (completedListState) =>
  completedListState.data.data
    .map((el) => el.roles)
    .flat(1)
    .map((el) => ({
      id: el.assign_user.user_id,
      rol: el.task_role.name,
    }))
    .filter((el) => el.rol === 'Исполнитель'),
);
export const status = createSelector(selectSelf, (state) => state.status);
