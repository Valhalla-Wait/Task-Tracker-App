import { createSlice } from '@reduxjs/toolkit';
import { ReducerType } from './types';
import {
  assignTagToTask,
  createTag,
  editTag,
  fetchTags,
  removeTag,
  unAssignTagFromTask,
} from './effects';

const initialState: ReducerType = { data: [], status: null, error: '' };

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Получение всех тегов
    builder.addCase(fetchTags.pending, (state) => ({
      ...state,
      status: 'loading',
      error: '',
    }));
    builder.addCase(fetchTags.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(fetchTags.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
    // Создание тега
    builder.addCase(createTag.pending, (state) => ({
      ...state,
      status: 'loading',
      error: '',
    }));
    builder.addCase(createTag.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: [...state.data, action.payload],
    }));
    builder.addCase(createTag.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
    // Редактирование тега
    builder.addCase(editTag.pending, (state) => ({
      ...state,
      status: 'loading',
      error: '',
    }));
    builder.addCase(editTag.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: [
        ...state.data.filter((tag) => tag.task_tag_id !== action.payload.task_tag_id),
        action.payload,
      ],
    }));
    builder.addCase(editTag.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
    // Удаление тега
    builder.addCase(removeTag.pending, (state) => ({
      ...state,
      status: 'loading',
      error: '',
    }));
    builder.addCase(removeTag.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: [...state.data.filter((tag) => tag.task_tag_id !== action.payload.task_tag_id)],
    }));
    builder.addCase(removeTag.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
    // Назначение тега задаче
    builder.addCase(assignTagToTask.pending, (state) => ({
      ...state,
      status: 'loading',
      error: '',
    }));
    builder.addCase(assignTagToTask.fulfilled, (state) => ({
      ...state,
      status: 'success',
    }));
    builder.addCase(assignTagToTask.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
    // Снятие тега с задачи
    builder.addCase(unAssignTagFromTask.pending, (state) => ({
      ...state,
      status: 'loading',
      error: '',
    }));
    builder.addCase(unAssignTagFromTask.fulfilled, (state) => ({
      ...state,
      status: 'success',
    }));
    builder.addCase(unAssignTagFromTask.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
