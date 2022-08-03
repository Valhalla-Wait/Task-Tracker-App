import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import {
  AtWorkListEffects,
  CompletedListEffects,
  IncomingListEffects,
  NotCompletedListEffects,
  RejectedListEffects,
  StatusesTypes,
  OneTaskActions,
  HistoryEffects,
  OneTaskEffects,
  RootStateType,
} from 'store';
import {
  TagAssignResponseType,
  TagCERequestBodyType,
  TagResponseType,
  TagsFetchResponseType,
} from './types';

export const fetchTags = createAsyncThunk('tags/fetchTags', async (_, { rejectWithValue }) => {
  try {
    const response = await makeRequest<TagsFetchResponseType>({
      url: 'task/tags',
      params: { per_page: 500 },
    });

    return response.data.data;
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

export const createTag = createAsyncThunk(
  'tags/createTag',
  async (data: { body: TagCERequestBodyType; task_id: string }, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeRequest<TagResponseType>({
        url: 'task/tags',
        method: 'POST',
        data: data.body,
      });

      dispatch(
        assignTagToTask({
          task_id: data.task_id,
          body: { task_tag_id: response.data.data.task_tag_id },
        }),
      );
      dispatch(OneTaskEffects.refetchOneTask(data.task_id));
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const editTag = createAsyncThunk(
  'tags/editTag',
  async (
    data: { body: TagCERequestBodyType; tag_id: string },
    { rejectWithValue, dispatch, getState },
  ) => {
    try {
      const response = await makeRequest<TagResponseType>({
        url: `task/tags/${data.tag_id}`,
        method: 'POST',
        data: data.body,
      });
      const { task_id: taskId } = (getState() as RootStateType).oneTask.data;
      dispatch(OneTaskEffects.refetchOneTask(taskId));
      dispatch(CompletedListEffects.fetchAll({}));
      dispatch(AtWorkListEffects.fetchAll({}));
      dispatch(IncomingListEffects.fetchAll({}));
      dispatch(NotCompletedListEffects.fetchAll({}));
      dispatch(RejectedListEffects.fetchAll({}));

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const removeTag = createAsyncThunk(
  'tags/removeTag',
  async (tagId: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await makeRequest<TagResponseType>({
        url: `task/tags/${tagId}`,
        method: 'DELETE',
      });
      const { task_id: taskId } = (getState() as RootStateType).oneTask.data;
      dispatch(OneTaskEffects.refetchOneTask(taskId));
      dispatch(CompletedListEffects.fetchAll({}));
      dispatch(AtWorkListEffects.fetchAll({}));
      dispatch(IncomingListEffects.fetchAll({}));
      dispatch(NotCompletedListEffects.fetchAll({}));
      dispatch(RejectedListEffects.fetchAll({}));

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const assignTagToTask = createAsyncThunk(
  'tags/assignTagToTask',
  async (
    data: { body: { task_tag_id: string }; task_id: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await makeRequest<TagAssignResponseType>({
        url: `task/tasks/${data.task_id}/tag-assign`,
        method: 'POST',
        data: data.body,
      });

      // Добавить вызов обновления задачи
      // eslint-disable-next-line default-case
      switch (response.data.data.status.task_status_id) {
        case StatusesTypes.statusesId.completed:
          dispatch(CompletedListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.created:
          dispatch(IncomingListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.inWork:
          dispatch(AtWorkListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.notCompleted:
          dispatch(NotCompletedListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.rejected:
          dispatch(RejectedListEffects.fetchAll({}));
          break;
      }
      dispatch(OneTaskActions.changeData(response.data.data));
      dispatch(HistoryEffects.fetchHistory(data.task_id));

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const unAssignTagFromTask = createAsyncThunk(
  'tags/unAssignTagFromTask',
  async (
    data: { body: { task_tag_id: string }; task_id: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await makeRequest<TagAssignResponseType>({
        url: `task/tasks/${data.task_id}/tag-unassign`,
        method: 'POST',
        data: data.body,
      });

      // eslint-disable-next-line default-case
      switch (response.data.data.status.task_status_id) {
        case StatusesTypes.statusesId.completed:
          dispatch(CompletedListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.created:
          dispatch(IncomingListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.inWork:
          dispatch(AtWorkListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.notCompleted:
          dispatch(NotCompletedListEffects.fetchAll({}));
          break;
        case StatusesTypes.statusesId.rejected:
          dispatch(RejectedListEffects.fetchAll({}));
          break;
      }
      dispatch(OneTaskActions.changeData(response.data.data));
      dispatch(HistoryEffects.fetchHistory(data.task_id));

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
