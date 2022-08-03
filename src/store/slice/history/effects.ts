import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { HistoryResponseType } from './types';

export const fetchHistory = createAsyncThunk(
  'history/fetchHistory',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await makeRequest<HistoryResponseType>({
        url: 'history/commands',
        params: {
          relation_id: taskId,
        },
      });
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
