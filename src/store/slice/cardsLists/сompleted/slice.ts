import { createSlice } from '@reduxjs/toolkit';
import { Types } from 'store';
import { sortMethods } from '../types';
import { setSortAction } from './actions';
import { fetchAll } from './effects';

const initialState: Types.TasksListReducerType = {
  data: {
    pagination: { items_count: 0, items_total: -1, per_page: 2, page_current: 1, page_total: 0 },
    data: [],
  },
  sort: sortMethods.date,
  status: null,
  error: '',
};

export const CompletedListSlice = createSlice({
  name: 'CompletedList',
  initialState,
  reducers: { setSortAction },
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      error: '',
      data: action.payload,
    }));
    builder.addCase(fetchAll.pending, (state) => ({
      ...state,
      status: 'loading',
      error: '',
    }));
    builder.addCase(fetchAll.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
