/* eslint-disable max-len */
import {
  AtWorkListEffects,
  IncomingListEffects,
  CompletedListEffects,
  RejectedListEffects,
  NotCompletedListEffects,
  OneTaskActions,
  HistoryEffects,
} from 'store';
import { ReactNode } from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { StatusResponseType } from './types';

export const fetchStatuses = createAsyncThunk(
  'statuses/fetchStatuses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest<StatusResponseType>({
        url: 'task/statuses',
      });
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const changeStatuses = createAsyncThunk(
  'statuses/changeStatuses',
  async (
    sourse: { data: { task_status_id: ReactNode }; taskId: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data, taskId } = sourse;
      const response = await makeRequest<StatusResponseType>({
        url: `task/tasks/${taskId}/status-change`,
        method: 'POST',
        data,
      });
      dispatch(OneTaskActions.changeData(response.data.data));
      dispatch(CompletedListEffects.fetchAll({}));
      dispatch(AtWorkListEffects.fetchAll({}));
      dispatch(IncomingListEffects.fetchAll({}));
      dispatch(NotCompletedListEffects.fetchAll({}));
      dispatch(RejectedListEffects.fetchAll({}));
      dispatch(HistoryEffects.fetchHistory(taskId));

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
