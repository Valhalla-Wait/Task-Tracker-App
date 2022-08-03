import { createSlice } from '@reduxjs/toolkit';
import { StatusesReducerType } from './types';
import { changeStatuses, fetchStatuses } from './effects';

const initialState: StatusesReducerType = { data: [], status: null, error: '' };

export const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStatuses.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchStatuses.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(fetchStatuses.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));

    builder.addCase(changeStatuses.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(changeStatuses.fulfilled, (state) => ({
      ...state,
      status: 'success',
    }));
    builder.addCase(changeStatuses.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
