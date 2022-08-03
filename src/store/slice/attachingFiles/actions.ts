import { AttachingFilesReducerType } from './types';

export const setUploadFileData = (
  state: AttachingFilesReducerType,
  action: {
    payload: {
      uploadProgress: number | null;
      uploadFileType: string;
      uploadfileName: string;
    };
  },
) => ({
  ...state,
  uploadProgress: action.payload.uploadProgress,
  uploadFileType: action.payload.uploadFileType,
  fileName: action.payload.uploadfileName,
});
