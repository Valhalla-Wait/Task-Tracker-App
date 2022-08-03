import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.statuses;

export const statusesSelector = createSelector(selectSelf, (statusesState) => statusesState.data);

export const statusesSelectorOptions = createSelector(selectSelf, (statusesState) =>
  statusesState.data.map((item) => ({
    value: item.task_status_id,
    label: item.name,
  })),
);

export const statusesSelectorOptionsBefore = createSelector(selectSelf, (statusesState) =>
  statusesState.data
    .map((item) => ({
      value: item.task_status_id,
      label: item.name,
    }))
    .filter((el) => el.label !== 'Отклонена' && el),
);

export const statusesSelectorOptionsAfter = createSelector(selectSelf, (statusesState) =>
  statusesState.data
    .map((item) => ({
      value: item.task_status_id,
      label: item.name,
    }))
    .filter((el) => el.label === 'Отклонена' && el),
);

export const statusesErrSelector = createSelector(
  selectSelf,
  (statusesState) => statusesState.error,
);

export const statusesStatusSelector = createSelector(
  selectSelf,
  (statusesState) => statusesState.status,
);
