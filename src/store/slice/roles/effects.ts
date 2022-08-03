import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { OneTaskActions, HistoryEffects } from 'store';
import { RolesResponseType } from './types';

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (_, { rejectWithValue }) => {
  try {
    const response = await makeRequest<RolesResponseType>({
      url: 'task/roles',
    });
    return response.data.data;
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

export const assingRoles = createAsyncThunk(
  'roles/assingRoles',
  async (
    sourse: {
      data: {
        assign_user_id: string;
        task_role_id: string;
      };
      taskId: string;
    },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data, taskId } = sourse;
      const response = await makeRequest<RolesResponseType>({
        url: `task/tasks/${taskId}/role-assign`,
        method: 'POST',
        data,
      });

      dispatch(HistoryEffects.fetchHistory(taskId));
      dispatch(OneTaskActions.changeData(response.data.data));
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const unassingRoles = createAsyncThunk(
  'roles/unassingRoles',
  async (
    sourse: {
      data: {
        assign_user_id: string;
        task_role_id: string;
      };
      taskId: string;
    },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data, taskId } = sourse;
      const response = await makeRequest<RolesResponseType>({
        url: `task/tasks/${taskId}/role-unassign`,
        method: 'POST',
        data,
      });
      dispatch(HistoryEffects.fetchHistory(taskId));
      dispatch(OneTaskActions.changeData(response.data.data));
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
