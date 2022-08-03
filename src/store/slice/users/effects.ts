import { createAsyncThunk } from '@reduxjs/toolkit';
import { Helpers, makeRequest } from 'shared';
import { UsersResponseType } from './types';

const { getRandomColor, getInitials } = Helpers;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await makeRequest<UsersResponseType>({
      url: 'external/users',
      params: { per_page: 500 },
    });

    return response.data.data
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((user) => ({
        ...user,
        color: getRandomColor(),
        initials: getInitials(user.name),
      }));
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});
// search

// export const searchUsers = createAsyncThunk(
//   'users/searchUsers',
//   async (userName: string, { rejectWithValue }) => {
//     try {
//       const response = await makeRequest<UsersResponseType>({
//         url: 'external/users',
//         params: {
//           search: userName,
//         },
//       });
//       return response.data.data;
//     } catch (e) {
//       return rejectWithValue((e as Error).message);
//     }
//   },
// );
