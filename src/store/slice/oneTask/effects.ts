import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { OneTaskActions, HistoryEffects } from 'store';
import {
  CheckListAssignResponseType,
  CheckListItemResponseType,
  CheckListResponseType,
  OneTaskFetchResponseType,
} from './types';

export const fetchOneTask = createAsyncThunk(
  'oneTask/fetchOneTask',
  async (taskID: any, { rejectWithValue, dispatch }) => {
    dispatch(OneTaskActions.setCurrentOneTaskId(taskID));
    try {
      const response = await makeRequest<OneTaskFetchResponseType>({
        url: `task/tasks/${taskID}`,
      });
      dispatch(HistoryEffects.fetchHistory(taskID));
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
// Изменение заголовка задачи
export const oneTaskTitleChange = createAsyncThunk(
  'oneTask/oneTaskTitleChange',
  async (
    data: {
      taskID: string;
      body: { title: string };
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await makeRequest<OneTaskFetchResponseType>({
        url: `task/tasks/${data.taskID}/title-change`,
        method: 'POST',
        data: data.body,
      });
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
// Изменение описания задачи
export const oneTaskDescriptionChange = createAsyncThunk(
  'oneTask/oneTaskDescriptionChange',
  async (
    data: {
      taskID: string;
      body: { description: string };
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await makeRequest<OneTaskFetchResponseType>({
        url: `task/tasks/${data.taskID}/description-change`,
        method: 'POST',
        data: data.body,
      });
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const refetchOneTask = createAsyncThunk(
  'oneTask/refetchOneTask',
  async (taskID: string, { rejectWithValue }) => {
    try {
      const response = await makeRequest<OneTaskFetchResponseType>({
        url: `task/tasks/${taskID}`,
      });
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const assignCheckListToTask = createAsyncThunk(
  'oneTask/assignCheckListToTask',
  async (
    data: {
      taskID: string;
      body: { check_list_id: string };
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await makeRequest<CheckListAssignResponseType>({
        url: `task/tasks/${data.taskID}/check-list-assign`,
        method: 'POST',
        data: data.body,
      });
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const unassignCheckListToTask = createAsyncThunk(
  'oneTask/unassignCheckListToTask',
  async (
    data: {
      taskID: string;
      body: { check_list_id: string };
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await makeRequest<OneTaskFetchResponseType>({
        url: `task/tasks/${data.taskID}/check-list-un-assign`,
        method: 'POST',
        data: data.body,
      });
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

// ЧЕК-ЛИСТЫ

export const checkListCreate = createAsyncThunk(
  'oneTask/checkListCreate',
  async (data: { body: { title: string }; taskID: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeRequest<CheckListResponseType>({
        url: 'check-list/check-lists',
        method: 'POST',
        data: data.body,
      });

      dispatch(
        assignCheckListToTask({
          taskID: data.taskID,
          body: { check_list_id: response.data.data.check_list_id },
        }),
      );

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const checkListTitleChange = createAsyncThunk(
  'oneTask/checkListTitleChange',
  async (
    data: {
      checkListID: string;
      newTitle: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await makeRequest<CheckListResponseType>({
        url: `check-list/check-lists/${data.checkListID}/title-change`,
        method: 'POST',
        params: { title: data.newTitle },
      });

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const checkListItemAdd = createAsyncThunk(
  'oneTask/checkListItemAdd',
  async (
    data: {
      body: { message: string };
      checkListID: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await makeRequest<CheckListItemResponseType>({
        url: `check-list/check-lists/${data.checkListID}/items`,
        method: 'POST',
        data: data.body,
      });

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const checkListItemRename = createAsyncThunk(
  'oneTask/checkListItemRename',
  async (
    data: {
      checkListID: string;
      itemID: string;
      body: { message: string };
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await makeRequest<CheckListItemResponseType>({
        url: `check-list/check-lists/${data.checkListID}/items/${data.itemID}/message-change`,
        method: 'POST',
        data: data.body,
      });

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const checkListItemComleteChange = createAsyncThunk(
  'oneTask/checkListItemComleteChange',
  async (
    data: {
      checkListID: string;
      itemID: string;
      body: { complete: boolean };
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await makeRequest<CheckListItemResponseType>({
        url: `check-list/check-lists/${data.checkListID}/items/${data.itemID}/complete-change`,
        method: 'POST',
        data: data.body,
      });

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const checkListItemDelete = createAsyncThunk(
  'oneTask/checkListItemDelete',
  async (
    data: {
      checkListID: string;
      itemID: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await makeRequest<CheckListItemResponseType>({
        url: `check-list/check-lists/${data.checkListID}/items/${data.itemID}`,
        method: 'DELETE',
      });

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const checkListItemPositionChange = createAsyncThunk(
  'oneTask/checkListItemPositionChange',
  async (
    data: {
      checkListID: string;
      body: {
        check_list_item_id: string;
        after_id: string | null;
      };
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await makeRequest<CheckListResponseType>({
        url: `check-list/check-lists/${data.checkListID}/position-change`,
        method: 'POST',
        data: data.body,
      });

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
