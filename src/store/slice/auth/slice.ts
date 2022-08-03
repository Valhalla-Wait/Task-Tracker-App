import { createSlice } from '@reduxjs/toolkit';
import { Helpers } from 'shared';
import { ReducerType } from './types';
import { fetchToken } from './effects';
import { removeTokenAction as removeToken, setTokenAction as setToken } from './actions';

const initialState: ReducerType = {
  token: '',
  status: null,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { setToken, removeToken },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchToken.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      token: action.payload.token,
    }));
    builder.addCase(fetchToken.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
