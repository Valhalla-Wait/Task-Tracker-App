import { createSlice } from '@reduxjs/toolkit';
import { newDataSubscribes } from './actions';
import { ReducerType, SubscribesCountResponseType } from './types';
import { fetchCountSubscribes, subscribe, deleteSubscribe } from './effects';

const initialState: ReducerType = {
  data: {} as SubscribesCountResponseType,
  status: null,
  error: '',
};

export const countSubscribesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: { newDataSubscribes },
  extraReducers: (builder) => {
    builder.addCase(fetchCountSubscribes.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchCountSubscribes.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(fetchCountSubscribes.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));

    builder.addCase(subscribe.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(subscribe.fulfilled, (state) => ({
      ...state,
      status: 'success',
    }));
    builder.addCase(subscribe.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));

    builder.addCase(deleteSubscribe.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(deleteSubscribe.fulfilled, (state) => ({
      ...state,
      status: 'success',
    }));
    builder.addCase(deleteSubscribe.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
