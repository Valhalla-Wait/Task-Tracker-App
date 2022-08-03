import { Progress } from 'antd';
import React from 'react';
import { FileIcon } from 'shared/icon';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AttachingFilesSelectors } from 'store';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const PendingFileComponent = () => {
  const uploadStatus = useSelector(AttachingFilesSelectors.attachingFilesStatusSelector);
  const uploadProgress: number | null = useSelector(
    AttachingFilesSelectors.attachingFilesUploadProgressSelector,
  );
  const fileName = useSelector(AttachingFilesSelectors.attachingFilesUploadFileNameSelector);
  return (
    <PendingFileItem>
      {uploadStatus === 'fail' ? (
        <div className="attachments_item_file__link err">
          <div className="attachments_item_file__icon">
            <ExclamationCircleOutlined
              style={{ color: 'var(--color-error-default)', fontSize: '20px' }}
            />
          </div>
          <div className="attachments_item_file__data">
            <div className="attachments_item_file__title">
              {fileName}
            </div>
            <div className="attachments_item_file__file_size">Не удалось загрузить файл.</div>
          </div>
        </div>
      ) : (
        <div className="attachments_item_file__link">
          <div className="attachments_item_file__icon">
            <FileIcon />
          </div>
          <div className="attachments_item_file__data">
            <div className="attachments_item_file__title">
              {fileName}
            </div>
            <div className="attachments_item_file__file_size">
              <Progress percent={uploadProgress ?? 0} status="active" showInfo={false} />
            </div>
          </div>
        </div>
      )}
    </PendingFileItem>
  );
};
const PendingFileItem = styled.div`
  .err {
    background-color: #ffdddd;
    height: 100%;
  }
  .attachments_item_file__link {
    display: flex;
    color: var(--color-grey900);
  }
  border-radius: 8px;
  width: 232px;
  height: 80px;
  background: var(--color-unnamed-blue1-15pct);
  overflow: hidden;
  position: relative;
  .attachments_item_file__icon {
    margin: 8px 0 0 8px;
  }
  .attachments_item_file__data {
    margin: 12px 21px 12px 16px;
  }
  .attachments_item_file__title {
    font: var(--h6-12_16-bold);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 130px;
  }
  .attachments_item_file__file_size {
    font: var(--paragraph-14_16-regular);
    color: var(--color-grey600);
    margin-top: 8px;
  }
`;
