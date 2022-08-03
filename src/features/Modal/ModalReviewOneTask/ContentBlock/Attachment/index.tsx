import { Button } from 'antd';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AttachmentIcon } from 'shared/icon';
import { AttachingFilesSelectors, Types } from 'store';
import styled from 'styled-components';
import { OutputFiles } from './OutputFiles';
import { OutputPendingFileComponent } from './PendingFileItem';
import { PreviewModal } from './PreviewModal';

type FileType = Types.TaskStorageFileType;

export const Attachment = (props: { files: FileType[]; taskId: string }) => {
  const { files, taskId } = props;
  const [deploy, setDeploy] = useState<boolean>(false);
  const [previewFile, setPreviewFile] = useState<FileType | null>(null);

  const pendingFile: number | null = useSelector(
    AttachingFilesSelectors.attachingFilesUploadProgressSelector,
  );

  const imgFiles = useMemo(() => files.filter((f: FileType) => f.type === 'image'), [files]);

  const ordinaryFiles = useMemo(() => files.filter((f: FileType) => f.type === 'file'), [files]);

  return (
    <AttachmentsConteiner isCollapsable={imgFiles.length > 3 || ordinaryFiles.length > 2}>
      <div className="attachments_header">
        <div className="attachments_header__icon">
          <AttachmentIcon />
        </div>
        <div className="attachments_header__title">Вложения</div>
        <div className="attachments_header__total_files">
          {files.length}
        </div>
        <div className="attachments_header__deploy_btn">
          <Button onClick={() => setDeploy((prev) => !prev)}>
            {deploy ? 'Свернуть' : 'Развернуть'}
          </Button>
        </div>
      </div>

      <div className="attachments_content">
        {deploy ? (
          <>
            <OutputFiles
              files={imgFiles.concat(ordinaryFiles)}
              taskId={taskId}
              setFile={setPreviewFile}
            />
            {pendingFile && <OutputPendingFileComponent />}
          </>
        ) : (
          <>
            <OutputFiles
              files={imgFiles.slice(0, 3).concat(ordinaryFiles.slice(0, 2))}
              taskId={taskId}
              setFile={setPreviewFile}
            />
            {pendingFile && <OutputPendingFileComponent />}
          </>
        )}
        {previewFile ? (
          <PreviewModal
            file={previewFile}
            imgFiles={imgFiles}
            taskId={taskId}
            setPreviewFile={setPreviewFile}
          />
        ) : null}
      </div>
    </AttachmentsConteiner>
  );
};

const AttachmentsConteiner = styled.div<{ isCollapsable: boolean }>`
  display: grid;
  grid-template-rows: auto auto;

  .attachments_header {
    display: flex;
    margin-bottom: 8px;
    align-items: center;
    font: var(--h5-16_24-medium);

    &__icon {
      display: flex;
      width: 30px;
      margin-right: 16px;
      justify-content: center;
      align-items: center;
    }

    &__total_files {
      color: var(--color-grey700);
      margin-left: 5px;
    }

    &__deploy_btn {
      display: ${(p) => (p.isCollapsable ? 'block' : 'none')};

      button {
        background: var(--color-grey200);
        color: var(--color-grey600);
        border: none;
        border-radius: 8px;
        height: 24px;
        margin-left: 14px;
        font: var(--h6-12_16-medium);
      }
    }
  }

  .attachments_content {
    display: flex;
    flex-wrap: wrap;
    height: calc(100% + 4px);
    max-height: 300px;
    max-width: 560px;
    margin: 0 0 8px 46px;
    gap: 8px;
    overflow: auto;

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--color-mainblue-default);
      border-radius: 4px;
      box-shadow: inset 0 0 5px var(--color-blue);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #253861;
    }
  }

  button {
    border-radius: 8px;
    color: var(--color-grey600);
    border: none;
    background: none;
  }
`;
