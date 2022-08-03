import { Types } from 'store';

export type AttachingFilesReducerType = {
  data: Types.TaskStorageFileType[];
  status: Types.ReducerStatusType;
  error: string;
  uploadProgress: number | null;
  uploadFileType: string;
  uploadFileName: string;
};

export type FileType = Types.TaskStorageFileType;

export type AttachingFileResponseType = {
  data: Types.TaskCardDetailType;
  relation: {
    storage_file_id: string;
    task_id: string;
    task_to_storage_file_id: string;
  };
};
export type StorageType = Types.StorageType;
