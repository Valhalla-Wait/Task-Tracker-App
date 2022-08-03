import { createSlice } from '@reduxjs/toolkit';
import { setUploadFileData } from './actions';
import { AttachingFilesReducerType } from './types';
import { attachFileToTask, detachFile } from './effects';

const initialState: AttachingFilesReducerType = {
  data: [],
  status: null,
  error: '',
  uploadProgress: null,
  uploadFileType: '',
  uploadFileName: '',
};

export const AttachingFilesSlice = createSlice({
  name: 'attachingFiles',
  initialState,
  reducers: { setUploadFileData },
  extraReducers: (builder) => {
    builder.addCase(attachFileToTask.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(attachFileToTask.fulfilled, (state, action) => ({
      ...state,
      status: 'success',
      data: action.payload,
    }));
    builder.addCase(attachFileToTask.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
    builder.addCase(detachFile.pending, (state) => ({
      ...state,
      status: 'loading',
    }));
    builder.addCase(detachFile.fulfilled, (state) => ({
      ...state,
      status: 'success',
    }));
    builder.addCase(detachFile.rejected, (state, action) => ({
      ...state,
      status: 'fail',
      error: action.payload as string,
    }));
  },
});
