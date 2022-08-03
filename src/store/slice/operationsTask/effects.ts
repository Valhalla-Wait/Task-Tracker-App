import React from 'react';
import {
  StatusesTypes,
  AtWorkListEffects,
  IncomingListEffects,
  NotCompletedListEffects,
  CompletedListEffects,
  RejectedListEffects,
  OneTaskActions,
  Types,
  HistoryEffects,
} from 'store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { RootStateType } from 'store/rootReducer';
import { TaskResponseType } from './types';

export const createTask = createAsyncThunk(
  'task/createTask',
  async (taskTitle: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeRequest<TaskResponseType>({
        url: 'task/tasks',
        method: 'post',
        data: {
          task_status_id: StatusesTypes.statusesId.created,
          title: taskTitle,
        },
      });

      dispatch(
        IncomingListEffects.fetchAll({
          page: 1,
          sort: Types.sortMethods.date,
        }),
      );
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (sourse: { taskId: string; statusId: string }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { taskId, statusId } = sourse;
      const response = await makeRequest<TaskResponseType>({
        url: `task/tasks/${taskId}`,
        method: 'DELETE',
      });
      // Common
      let page: number;

      const storData = getState() as RootStateType;
      // atWorkList
      const atWorkPagination = storData.atWorkList.data.pagination;

      // rejectedList
      const rejectedPagination = storData.rejectedList.data.pagination;

      // сompletedList
      const completedPagination = storData.сompletedList.data.pagination;

      // incomingList
      const incomingPagination = storData.incomingList.data.pagination;

      // notCompletedList
      const notCompletedPagination = storData.notCompletedList.data.pagination;

      switch (statusId) {
        case StatusesTypes.statusesId.created:
          page =
            incomingPagination.items_count === 1 &&
            incomingPagination.page_current === incomingPagination.page_total ?
              incomingPagination.page_current - 1 :
              incomingPagination.page_current;
          dispatch(IncomingListEffects.fetchAll({ page }));
          break;
        case StatusesTypes.statusesId.inWork:
          page =
            atWorkPagination.items_count === 1 &&
            atWorkPagination.page_current === atWorkPagination.page_total ?
              atWorkPagination.page_current - 1 :
              atWorkPagination.page_current;
          dispatch(AtWorkListEffects.fetchAll({ page }));
          break;
        case StatusesTypes.statusesId.notCompleted:
          page =
            notCompletedPagination.items_count === 1 &&
            notCompletedPagination.page_current === notCompletedPagination.page_total ?
              notCompletedPagination.page_current - 1 :
              notCompletedPagination.page_current;
          dispatch(NotCompletedListEffects.fetchAll({ page }));
          break;
        case StatusesTypes.statusesId.rejected:
          page =
            rejectedPagination.items_count === 1 &&
            rejectedPagination.page_current === rejectedPagination.page_total ?
              rejectedPagination.page_current - 1 :
              rejectedPagination.page_current;
          dispatch(RejectedListEffects.fetchAll({ page }));
          break;
        case StatusesTypes.statusesId.completed:
          page =
            completedPagination.items_count === 1 &&
            completedPagination.page_current === completedPagination.page_total ?
              completedPagination.page_current - 1 :
              completedPagination.page_current;
          dispatch(CompletedListEffects.fetchAll({ page }));
          break;
        default:
          break;
      }

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const duplicateTask = createAsyncThunk(
  'task/duplicateTask',
  async (sourse: { taskId: string; statusId: string }, { rejectWithValue, dispatch }) => {
    try {
      const { taskId, statusId } = sourse;

      const response = await makeRequest<TaskResponseType>({
        url: `task/tasks/${taskId}/clone`,
        method: 'POST',
        data: {},
      });

      // Остаёмся на исходной задаче, для перехода к дубликату
      // заменить {} на { page:1, sort: Types.sortMethods.date}
      switch (statusId) {
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
        case StatusesTypes.statusesId.completed:
          dispatch(CompletedListEffects.fetchAll({}));
          break;
        default:
          break;
      }

      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const changeDateStop = createAsyncThunk(
  'task/changeDateStop',
  async (
    sourse: {
      data: {
        exec_stop: string;
      };
      taskId: string;
    },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const { data, taskId } = sourse;
      const response = await makeRequest<TaskResponseType>({
        url: `task/tasks/${taskId}/exec-stop-change`,
        method: 'POST',
        data,
      });
      dispatch(OneTaskActions.changeData(response.data.data));
      dispatch(HistoryEffects.fetchHistory(taskId));
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
