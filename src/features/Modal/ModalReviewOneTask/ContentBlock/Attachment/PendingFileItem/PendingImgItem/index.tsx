import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { AttachingFilesSelectors } from 'store';
import styled from 'styled-components';

export const PendingImgComponent = () => {
  const uploadStatus = useSelector(AttachingFilesSelectors.attachingFilesStatusSelector);
  const uploadProgress: number | null = useSelector(
    AttachingFilesSelectors.attachingFilesUploadProgressSelector,
  );
  return (
    <PendingImgItem>
      {uploadStatus === 'fail' ? (
        <div className="attachments_img_pending err">
          <ExclamationCircleOutlined
            style={{ color: 'var(--color-error-default)', fontSize: '20px' }}
          />
          <br />
          <span>Не удалось загрузить файл</span>
        </div>
      ) : (
        <div className="attachments_img_pending">
          <Progress percent={uploadProgress ?? 0} status="active" showInfo={false} />
        </div>
      )}
    </PendingImgItem>
  );
};
const PendingImgItem = styled.div`
  .attachments_img_pending {
    position: relative;
    overflow: hidden;
    width: 160px;
    height: 88px;
    border-radius: 8px;
    padding-top: 30px;
  }
  .err {
    background-color: #ffdddd;
    text-align: center;
    font: var(--paragraph-14_24-regular);
    padding: 7px;
  }
  width: 160px;
  height: 110px;
`;
