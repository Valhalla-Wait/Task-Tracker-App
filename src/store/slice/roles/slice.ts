import { createSlice } from '@reduxjs/toolkit';
import { RolesReducerType } from './types';
import { assingRoles, fetchRoles, unassingRoles } from './effects';

const initialState: RolesReducerType = { data: [], status: null, error: '' };

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoles.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchRoles.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(fetchRoles.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));

    builder.addCase(assingRoles.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(assingRoles.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(assingRoles.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));

    builder.addCase(unassingRoles.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(unassingRoles.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(unassingRoles.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
