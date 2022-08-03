/* eslint-disable react/jsx-one-expression-per-line */
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileIcon } from 'shared/icon';
import { AttachingFilesEffects, OneTaskSelectors, Types } from 'store';
import styled from 'styled-components';

const { confirm } = Modal;

type FileType = Types.TaskStorageFileType;

const convertFileSize = (bytes: number) => {
  if (bytes === 0) return '0 байт';
  const sizes = ['байт', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** i).toFixed(2))} ${sizes[i]}`;
};

export const FileItemComponent = (props: { file: FileType; taskId: string }) => {
  const { file, taskId } = props;
  const isAuthor = useSelector(OneTaskSelectors.currentUserIsAuthorSelector);

  const dispatch = useDispatch();

  return (
    <FileItem>
      <div className="attachments_item_file__file_options">
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="download">
                <a
                  key={file.storage_file_id}
                  href={`${process.env.REACT_APP_TASK_BACKEND_URL}storage/files/${file.storage_file_id}/download`}
                  rel="noopener noreferrer"
                >
                  Скачать
                </a>
              </Menu.Item>
              {isAuthor && (
                <Menu.Item
                  onClick={() =>
                    confirm({
                      title: 'Вы действительно хотите удалить вложение?',
                      icon: <ExclamationCircleOutlined />,
                      okText: 'Отмена',
                      okType: 'danger',
                      cancelText: 'Продолжить',
                      onCancel() {
                        dispatch(
                          AttachingFilesEffects.detachFile({
                            taskId,
                            storage_id: file.storage_file_id,
                          }),
                        );
                      },
                      centered: true,
                    })
                  }
                  key="delete"
                >
                  Удалить
                </Menu.Item>
              )}
            </Menu>
          }
          placement="bottomRight"
          trigger={['click']}
        >
          <button type="button">
            <EllipsisOutlined style={{ fontSize: '20px', color: 'black' }} />
          </button>
        </Dropdown>
      </div>
      <div className="attachments_item_file__link">
        <div className="attachments_item_file__icon">
          <FileIcon />
        </div>
        <div className="attachments_item_file__data">
          <div className="attachments_item_file__title">{file.name_original}</div>
          <div className="attachments_item_file__file_size">{convertFileSize(file.size)}</div>
        </div>
      </div>
    </FileItem>
  );
};
const FileItem = styled.div`
  &:hover {
    .attachments_item_file__file_options {
      display: block;
    }
  }
  .attachments_item_file__file_options {
    position: absolute;
    right: 10px;
    top: 0;
    display: none;
  }
  .attachments_item_file__link {
    display: flex;
    color: var(--color-grey900);
  }
  border-radius: 8px;
  max-width: 232px;
  width: 45%;
  height: 80px;
  background: var(--color-unnamed-blue1-15pct);
  @media (max-width: 395px) {
    width: 100%;
  }
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
