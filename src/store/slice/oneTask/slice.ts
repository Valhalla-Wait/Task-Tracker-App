/* eslint-disable indent */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Types } from '..';

import {
  assignCheckListToTask,
  checkListCreate,
  checkListItemAdd,
  checkListItemComleteChange,
  checkListItemDelete,
  checkListItemPositionChange,
  checkListItemRename,
  checkListTitleChange,
  oneTaskTitleChange,
  unassignCheckListToTask,
  fetchOneTask,
  refetchOneTask,
} from './effects';
import { resetOneTask, changeData, setCurrentOneTaskId } from './actions';
import { ReducerType } from './types';

export const initialState: ReducerType = {
  data: {} as Types.TaskCardDetailType,
  checkListStatus: null,
  tagStatus: null,
  status: null,
  error: '',
  currentTaskId: '',
  titleStatus: '',
};

export const oneTaskSlice = createSlice({
  name: 'oneTask',
  initialState,

  reducers: { resetOneTask, changeData, setCurrentOneTaskId },

  extraReducers: (builder) => {
    // Получение детальной карточки задачи
    builder.addCase(fetchOneTask.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(fetchOneTask.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(fetchOneTask.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
    // Изменение заголовка
    builder.addCase(oneTaskTitleChange.pending, (state) => ({
      ...state,
      titleStatus: 'loading',
    }));
    builder.addCase(oneTaskTitleChange.fulfilled, (state, action) => ({
      ...state,
      titleStatus: 'success',
      data: {
        ...state.data,
        title: action.payload.title,
      },
    }));
    builder.addCase(oneTaskTitleChange.rejected, (state, action) => ({
      ...state,
      titleStatus: 'fail',
    }));
    builder.addCase(refetchOneTask.pending, (state) => ({
      ...state,
      tagStatus: 'loading',
    }));
    builder.addCase(refetchOneTask.fulfilled, (state, action) => ({
      ...state,
      tagStatus: 'success',
      data: action.payload,
    }));
    builder.addCase(refetchOneTask.rejected, (state, action) => ({
      ...state,
      tagStatus: 'fail',
      error: action.payload as string,
    }));
    // Назначение чек-листа на задачу
    builder.addCase(assignCheckListToTask.pending, (state) => ({
      ...state,
      checkListStatus: 'loading',
      error: '',
    }));
    builder.addCase(assignCheckListToTask.fulfilled, (state, action) => ({
      ...state,
      checkListStatus: 'success',
      data: action.payload,
    }));
    builder.addCase(assignCheckListToTask.rejected, (state, action) => ({
      ...state,
      checkListStatus: 'fail',
      error: action.payload as string,
    }));
    // Открепление чек-листа от задачи
    builder.addCase(unassignCheckListToTask.pending, (state) => ({
      ...state,
      checkListStatus: 'loading',
      error: '',
    }));
    builder.addCase(unassignCheckListToTask.fulfilled, (state, action) => ({
      ...state,
      checkListStatus: 'success',
      data: action.payload,
    }));
    builder.addCase(unassignCheckListToTask.rejected, (state, action) => ({
      ...state,
      checkListStatus: 'fail',
      error: action.payload as string,
    }));
    // Создание чек-листа
    builder.addCase(checkListCreate.pending, (state) => ({
      ...state,
      checkListStatus: 'loading',
      error: '',
    }));
    builder.addCase(checkListCreate.fulfilled, (state) => ({
      ...state,
      checkListStatus: 'success',
    }));
    builder.addCase(checkListCreate.rejected, (state, action) => ({
      ...state,
      checkListStatus: 'fail',
      error: action.payload as string,
    }));
    // Изменение заголовка чек-листа
    builder.addCase(checkListTitleChange.pending, (state) => ({
      ...state,
      checkListStatus: 'loading',
      error: '',
    }));
    builder.addCase(checkListTitleChange.fulfilled, (state, action) => ({
      ...state,
      checkListStatus: 'success',
      data: {
        ...state.data,
        check_lists: [
          { ...state.data.check_lists[0], title: action.payload.title },
          ...state.data.check_lists.slice(1),
        ],
      },
    }));
    builder.addCase(checkListTitleChange.rejected, (state, action) => ({
      ...state,
      checkListStatus: 'fail',
      error: action.payload as string,
    }));
    // Создание пункта чек-листа
    builder.addCase(checkListItemAdd.pending, (state) => ({
      ...state,
      checkListStatus: 'loading',
      error: '',
    }));
    builder.addCase(checkListItemAdd.fulfilled, (state, action) => ({
      ...state,
      checkListStatus: 'success',
      data: {
        ...state.data,
        check_lists: [
          {
            ...state.data.check_lists[0],
            items: [...(state.data.check_lists[0].items ?? []), action.payload],
          },
          ...state.data.check_lists.slice(1),
        ],
        progress: {
          percent: Math.round(
            ((state.data.check_lists[0].items?.reduce(
              (completed, current) => completed + (current.complete ? 1 : 0),
              0,
            ) ?? 0) *
              100) /
              ((state.data.check_lists[0].items?.length ?? 0) + 1),
          ),
          completed:
            state.data.check_lists[0].items?.reduce(
              (completed, current) => completed + (current.complete ? 1 : 0),
              0,
            ) ?? 0,
          total: (state.data.check_lists[0].items?.length ?? 0) + 1,
        },
      },
    }));
    builder.addCase(checkListItemAdd.rejected, (state, action) => ({
      ...state,
      checkListStatus: 'fail',
      error: action.payload as string,
    }));
    // Изменение заголовка пункта чек-листа
    builder.addCase(checkListItemRename.pending, (state) => ({
      ...state,
      checkListStatus: 'loading',
      error: '',
    }));
    builder.addCase(checkListItemRename.fulfilled, (state, action) => ({
      ...state,
      checkListStatus: 'success',
      data: {
        ...state.data,
        check_lists: [
          {
            ...state.data.check_lists[0],
            items: [
              // eslint-disable-next-line no-confusing-arrow
              ...(state.data.check_lists[0].items ?? []).map((el) =>
                el.check_list_item_id === action.payload.check_list_item_id ? action.payload : el,
              ),
            ],
          },
          ...state.data.check_lists.slice(1),
        ],
      },
    }));
    builder.addCase(checkListItemRename.rejected, (state, action) => ({
      ...state,
      checkListStatus: 'fail',
      error: action.payload as string,
    }));
    // Изменение статуса пункта чек-листа
    builder.addCase(checkListItemComleteChange.pending, (state) => ({
      ...state,
      checkListStatus: 'loading',
      error: '',
    }));
    builder.addCase(checkListItemComleteChange.fulfilled, (state, action) => ({
      ...state,
      checkListStatus: 'success',
      data: {
        ...state.data,
        check_lists: [
          {
            ...state.data.check_lists[0],
            items: [
              // eslint-disable-next-line no-confusing-arrow
              ...(state.data.check_lists[0].items ?? []).map((el) =>
                el.check_list_item_id === action.payload.check_list_item_id ? action.payload : el,
              ),
            ],
          },
          ...state.data.check_lists.slice(1),
        ],
        progress: {
          percent: Math.round(
            (((state.data.check_lists[0].items?.reduce(
              (completed, current) => completed + (current.complete ? 1 : 0),
              0,
            ) ?? 0) +
              (action.payload.complete ? 1 : -1)) *
              100) /
              (state.data.check_lists[0].items?.length ?? 0),
          ),
          completed:
            (state.data.check_lists[0].items?.reduce(
              (completed, current) => completed + (current.complete ? 1 : 0),
              0,
            ) ?? 0) + (action.payload.complete ? 1 : -1),
          total: state.data.check_lists[0].items?.length ?? 0,
        },
      },
    }));
    builder.addCase(checkListItemComleteChange.rejected, (state, action) => ({
      ...state,
      checkListStatus: 'fail',
      error: action.payload as string,
    }));
    // Удаление пункта чек-листа
    builder.addCase(checkListItemDelete.pending, (state) => ({
      ...state,
      checkListStatus: 'loading',
      error: '',
    }));
    builder.addCase(checkListItemDelete.fulfilled, (state, action) => ({
      ...state,
      checkListStatus: 'success',
      data: {
        ...state.data,
        check_lists: [
          {
            ...state.data.check_lists[0],
            items: [
              ...(state.data.check_lists[0].items ?? []).filter(
                (el) => el.check_list_item_id !== action.payload.check_list_item_id,
              ),
            ],
          },
          ...state.data.check_lists.slice(1),
        ],
        progress:
          state.data.check_lists[0].items!.length! <= 1 ?
            null :
            {
                percent: Math.round(
                  (((state.data.check_lists[0].items?.reduce(
                    (completed, current) => completed + (current.complete ? 1 : 0),
                    0,
                  ) ?? 0) -
                    (action.payload.complete ? 1 : 0)) *
                    100) /
                    ((state.data.check_lists[0].items?.length ?? 0) - 1),
                ),
                completed:
                  (state.data.check_lists[0].items?.reduce(
                    (completed, current) => completed + (current.complete ? 1 : 0),
                    0,
                  ) ?? 0) - (action.payload.complete ? 1 : 0),
                total: (state.data.check_lists[0].items?.length ?? 0) - 1,
              },
      },
    }));
    builder.addCase(checkListItemDelete.rejected, (state, action) => ({
      ...state,
      checkListStatus: 'fail',
      error: action.payload as string,
    }));
    // Изменение позиции пункта чек-листа
    builder.addCase(checkListItemPositionChange.pending, (state) => ({
      ...state,
      checkListStatus: 'loading',
      error: '',
    }));
    builder.addCase(checkListItemPositionChange.fulfilled, (state, action) => ({
      ...state,
      checkListStatus: 'success',
      data: {
        ...state.data,
        check_lists: [action.payload, ...state.data.check_lists.slice(1)],
      },
    }));
    builder.addCase(checkListItemPositionChange.rejected, (state, action) => ({
      ...state,
      checkListStatus: 'fail',
      error: action.payload as string,
    }));
  },
});
