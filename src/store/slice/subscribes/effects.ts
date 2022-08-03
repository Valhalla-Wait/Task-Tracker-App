/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { subscribesEffects } from 'store';
import { ChangeSubscribesResponseType, SubscribesResponseType } from './types';

export const fetchSubscribes = createAsyncThunk(
  'subscribes/fetchSubscribes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest<SubscribesResponseType>({
        url: 'subscribe/notifies',
        params: {
          page: 1,
          per_page: 500,
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

// export const fetchSubscribesFalse = createAsyncThunk(
//   'subscribes/fetchSubscribes',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await makeRequest<SubscribesResponseType>({
//         url: 'subscribe/notifies',
//         params: {
//           page: 1,
//           per_page: 500,
//           viewed: false,
//         },
//       });
//       return response.data;
//     } catch (e) {
//       return rejectWithValue((e as Error).message);
//     }
//   },
// );

// export const fetchSubscribesTrye = createAsyncThunk(
//   'subscribes/fetchSubscribes',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await makeRequest<SubscribesResponseType>({
//         url: 'subscribe/notifies',
//         params: {
//           page: 1,
//           per_page: 500,
//           viewed: true,
//         },
//       });
//       return response.data;
//     } catch (e) {
//       return rejectWithValue((e as Error).message);
//     }
//   },
// );

export const changeSubscribe = createAsyncThunk(
  'subscribes/changeSubscribe',
  async (
    data: {
      viewed: boolean;
      subscribe_notify_id: string[];
    },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await makeRequest<ChangeSubscribesResponseType>({
        url: 'subscribe/notifies/viewed-change',
        method: 'POST',
        data,
      });
      dispatch(subscribesEffects.fetchSubscribes());
      return response.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
