import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import Cookies from 'universal-cookie';

export const fetchToken = createAsyncThunk(
  'auth/fetchToken',
  async (data: { user_id: string }, { rejectWithValue }) => {
    const cookies = new Cookies();

    try {
      const response = await makeRequest<{ token: string }>({
        baseURL: process.env.REACT_APP_TASK_AUTH_BACKEND_URL,
        url: 'ladum/token/generate',
        method: 'POST',
        data,
      });

      cookies.set('token', response.data.token);
      cookies.set('user_id', data.user_id);
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
