import { createSlice } from '@reduxjs/toolkit';
import { CreateTaskReducerType } from './types';
import { changeDateStop, createTask, deleteTask, duplicateTask } from './effects';

const initialState: CreateTaskReducerType = { data: [], status: null, error: '' };

export const createTaskSlice = createSlice({
  name: 'createTask',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(createTask.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(createTask.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));

    builder.addCase(deleteTask.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(deleteTask.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(deleteTask.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));

    builder.addCase(duplicateTask.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(duplicateTask.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(duplicateTask.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));

    builder.addCase(changeDateStop.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(changeDateStop.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(changeDateStop.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
