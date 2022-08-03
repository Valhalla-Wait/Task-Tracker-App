import {
  StatusesTypes,
  AtWorkListEffects,
  IncomingListEffects,
  NotCompletedListEffects,
  RejectedListEffects,
  OneTaskActions,
  HistoryEffects,
} from 'store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { makeRequest } from 'shared';
import { PriorityResponseType } from './types';

export const fetchPriorities = createAsyncThunk(
  'priorities/fetchPriorities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest<PriorityResponseType>({
        url: 'task/priorities',
      });
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const changePriorities = createAsyncThunk(
  'priorities/changePriorities',
  async (
    sourse: { data: { task_priority_id: ReactNode }; taskId: string; statusId: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data, taskId, statusId } = sourse;
      const response = await makeRequest<PriorityResponseType>({
        url: `task/tasks/${taskId}/priority-change`,
        method: 'POST',
        data,
      });

      dispatch(OneTaskActions.changeData(response.data.data));

      dispatch(HistoryEffects.fetchHistory(taskId));

      switch (statusId) {
        case StatusesTypes.statusesId.created:
          dispatch(IncomingListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.inWork:
          dispatch(AtWorkListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.notCompleted:
          dispatch(NotCompletedListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.rejected:
          dispatch(RejectedListEffects.fetchAll({}));
          break;
        default:
          break;
      }

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
