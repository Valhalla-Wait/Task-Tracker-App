import { createSlice } from '@reduxjs/toolkit';
import { ReducerType } from './types';
import { fetchUserProfile } from './effects';

const initialState: ReducerType = {
  data: {
    user_id: '',
    name: '',
    logo: '',
    permissions: [],
  },
  status: null,
  error: '',
};

export const ProfileSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload.data,
    }));
    builder.addCase(fetchUserProfile.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
