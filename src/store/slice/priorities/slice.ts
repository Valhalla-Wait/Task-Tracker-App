import { createSlice } from '@reduxjs/toolkit';
import { PrioritiesReducerType } from './types';
import { changePriorities, fetchPriorities } from './effects';

const initialState: PrioritiesReducerType = { data: [], status: null, error: '' };

export const prioritiesSlice = createSlice({
  name: 'priorities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPriorities.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchPriorities.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(fetchPriorities.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));

    builder.addCase(changePriorities.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(changePriorities.fulfilled, (state) => ({
      ...state,
      status: 'success',
    }));
    builder.addCase(changePriorities.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
