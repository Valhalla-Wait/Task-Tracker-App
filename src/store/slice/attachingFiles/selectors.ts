import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.attachingFiles;

export const attachingFilesSelector = createSelector(
  selectSelf,
  (attachingFilesState) => attachingFilesState.data,
);
export const attachingFilesErrSelector = createSelector(
  selectSelf,
  (attachingFilesState) => attachingFilesState.error,
);
export const attachingFilesStatusSelector = createSelector(
  selectSelf,
  (attachingFilesState) => attachingFilesState.status,
);
export const attachingFilesUploadProgressSelector = createSelector(
  selectSelf,
  (attachingFilesState) => attachingFilesState.uploadProgress,
);
export const attachingFilesUploadFileTypeSelector = createSelector(
  selectSelf,
  (attachingFilesState) => attachingFilesState.uploadFileType,
);
export const attachingFilesUploadFileNameSelector = createSelector(
  selectSelf,
  (attachingFilesState) => attachingFilesState.uploadFileName,
);
