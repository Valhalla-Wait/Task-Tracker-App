import { createSlice } from '@reduxjs/toolkit';
import { HistoryReducerType } from './types';
import { fetchHistory } from './effects';

const initialState: HistoryReducerType = { data: [], status: null, error: '' };

export const historySlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchHistory.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(fetchHistory.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
