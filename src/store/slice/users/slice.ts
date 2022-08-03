import { createSlice } from '@reduxjs/toolkit';
import { UsersReducerType } from './types';
import { fetchUsers } from './effects';

const initialState: UsersReducerType = { data: [], status: null, error: '' };

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchUsers.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(fetchUsers.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
