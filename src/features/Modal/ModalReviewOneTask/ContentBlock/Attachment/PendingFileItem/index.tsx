import React from 'react';
import { useSelector } from 'react-redux';
import { AttachingFilesSelectors } from 'store';
import { PendingFileComponent } from './PendingFileItem';
import { PendingImgComponent } from './PendingImgItem';

export const OutputPendingFileComponent = () => {
  const attachmentType = useSelector(AttachingFilesSelectors.attachingFilesUploadFileTypeSelector);
  return (
    <div>
      {attachmentType === 'image/png' ? <PendingImgComponent /> : <PendingFileComponent />}
    </div>
  );
};
