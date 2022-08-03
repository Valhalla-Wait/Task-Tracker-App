import { createSlice } from '@reduxjs/toolkit';
import { ReducerType, SubscribesResponseType } from './types';
import { fetchSubscribes, changeSubscribe } from './effects';

const initialState: ReducerType = { data: {} as SubscribesResponseType, status: null, error: '' };

export const subscribesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubscribes.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchSubscribes.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(fetchSubscribes.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));

    builder.addCase(changeSubscribe.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(changeSubscribe.fulfilled, (state) => ({
      ...state,
      status: 'success',
    }));
    builder.addCase(changeSubscribe.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
