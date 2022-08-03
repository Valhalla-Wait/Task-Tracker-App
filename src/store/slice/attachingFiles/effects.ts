import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from 'shared';
import { AttachingFilesActions, OneTaskActions } from 'store';
import { StorageType, FileType, AttachingFileResponseType } from './types';

export const attachFileToTask = createAsyncThunk(
  'attachingFiles/attachFileToTask',
  async (
    data: {
      file: FormData;
      task_id: string;
      name_original: string;
      file_type: string;
    },
    { rejectWithValue, dispatch },
  ) => {
    const { file, task_id, name_original, file_type } = data;
    try {
      const createStorage = await makeRequest<StorageType>({
        url: 'storage/files',
        method: 'POST',
        data: {
          name_original,
        },
      });
      const uploadFileResponse = await makeRequest<FileType>({
        url: `storage/files/${createStorage.data.data.storage_file_id}/upload`,
        method: 'POST',
        data: file,
        onUploadProgress(progressEvent) {
          const progress: number | null = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          dispatch(
            AttachingFilesActions.setUploadFileData({
              uploadProgress: progress,
              uploadFileType: file_type,
              uploadfileName: name_original,
            }),
          );
        },
      });
      const attachingFileResponse = await makeRequest<AttachingFileResponseType>({
        url: `task/tasks/${task_id}/storage-file-assign`,
        method: 'POST',
        data: {
          storage_file_id: createStorage.data.data.storage_file_id,
        },
      });
      dispatch(OneTaskActions.changeData(attachingFileResponse.data.data));
      dispatch(
        AttachingFilesActions.setUploadFileData({
          uploadProgress: null,
          uploadFileType: '',
          uploadfileName: '',
        }),
      );
      return attachingFileResponse.data.data.storage_files;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

export const detachFile = createAsyncThunk(
  'attachingFiles/detachFile',
  async (
    data: {
      taskId: string;
      storage_id: string;
    },
    { rejectWithValue, dispatch },
  ) => {
    const { taskId, storage_id } = data;
    try {
      const response = await makeRequest<AttachingFileResponseType>({
        url: `task/tasks/${taskId}/storage-file-un-assign`,
        method: 'POST',
        data: {
          storage_file_id: storage_id,
        },
      });
      dispatch(OneTaskActions.changeData(response.data.data));
      return response.data.data;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);
