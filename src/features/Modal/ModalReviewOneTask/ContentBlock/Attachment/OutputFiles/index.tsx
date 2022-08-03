import React from 'react';
import { Types } from 'store';
import { FileItemComponent } from './FileItem';
import { ImgFileComponent } from './ImgItem';

type FileType = Types.TaskStorageFileType;

export const OutputFiles = (props: {
  files: FileType[];
  taskId: string;
  setFile: React.Dispatch<any>;
}) => {
  const { files, taskId, setFile } = props;
  return (
    <>
      {files.map((f) =>
        (f.type === 'image' ? (
          <ImgFileComponent key={f.storage_file_id} file={f} taskId={taskId} setFile={setFile} />
        ) : (
          <FileItemComponent key={f.storage_file_id} file={f} taskId={taskId} />
        )),
      )}
    </>
  );
};
