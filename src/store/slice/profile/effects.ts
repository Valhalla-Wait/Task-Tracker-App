import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { ProfileResponseType } from './types';

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await makeRequest<ProfileResponseType>({
        baseURL: process.env.REACT_APP_TASK_AUTH_BACKEND_URL,
        url: `/ladum/users/${userId}`,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
