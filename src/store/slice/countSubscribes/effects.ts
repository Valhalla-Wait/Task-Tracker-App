import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { countSubscribesEffects, countSubscribesActions } from 'store';
import { Datum, SubscribesCountResponseType } from './types';

export const fetchCountSubscribes = createAsyncThunk(
  'countSubscribes/fetchCountSubscribes',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeRequest<SubscribesCountResponseType>({
        url: 'subscribe/subscribes',
        params: {
          page: 1,
          per_page: 500,
        },
      });
      dispatch(countSubscribesActions.newDataSubscribes(response.data));
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const subscribe = createAsyncThunk(
  'subscribes/subscribe',
  async (
    data: {
      notifies: {
        web_hook: {
          url: 'http://domain.my/endpoint/:param';
          method: 'POST';
        };
        me: boolean;
      };
      relation_type: 'task';
      relation_id: string;
    },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await makeRequest<Datum>({
        url: 'subscribe/subscribes',
        method: 'POST',
        data,
      });
      dispatch(countSubscribesEffects.fetchCountSubscribes());
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const deleteSubscribe = createAsyncThunk(
  'subscribes/deleteSubscribe',
  async (subscribe_id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeRequest<Datum>({
        url: `subscribe/subscribes/${subscribe_id}`,
        method: 'DELETE',
      });
      dispatch(countSubscribesEffects.fetchCountSubscribes());
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
