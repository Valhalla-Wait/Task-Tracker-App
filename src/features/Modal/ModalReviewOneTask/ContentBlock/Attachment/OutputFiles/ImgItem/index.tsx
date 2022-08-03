/* eslint-disable react/jsx-no-useless-fragment */
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AttachingFilesEffects, OneTaskSelectors, Types } from 'store';
import styled from 'styled-components';

type FileType = Types.TaskStorageFileType;
const { confirm } = Modal;
export const ImgFileComponent = (props: {
  file: FileType;
  taskId: string;
  setFile: React.Dispatch<any>;
}) => {
  const { file, taskId, setFile } = props;
  const isAuthor = useSelector(OneTaskSelectors.currentUserIsAuthorSelector);

  const dispatch = useDispatch();
  return (
    <ImgItem>
      <div className="attachments_item_img__content">
        <button type="button" onClick={() => setFile(file)}>
          <div
            className="attachments_item_img__img"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_TASK_BACKEND_URL}storage/files/${file.storage_file_id}/download)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </button>

        <div className="attachments_item_img__file_options">
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
            <button type="button" className="file_option_btn">
              <EllipsisOutlined style={{ fontSize: '20px', color: 'black' }} />
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="attachments_item_img__title">
        {file.name_original}
      </div>
    </ImgItem>
  );
};

const ImgItem = styled.div`
  &:hover {
    .attachments_item_img__file_options {
      display: block;
    }
  }
  .attachments_item_img__file_options {
    position: absolute;
    right: 5px;
    top: 0;
    display: none;
    .ant-dropdown-menu-title-content {
      button {
        border-radius: 8px;
        color: var(--color-grey600);
        border: none;
        background: none;
      }
    }
    &__img {
    }
  }

  // img {
  //   width: 160px;
  //   height: 88px;
  // }
  .attachments_item_img__content {
    position: relative;
    overflow: hidden;
    width: 160px;
    height: 88px;
    border-radius: 8px;
    border: 1px solid var(--color-grey400);
    button {
      padding: 0;
      width: 100%;
      height: 100%;
    }
  }
  .attachments_item_img__img {
    height: 100%;
  }
  .attachments_item_img__title {
    margin-top: 8px;
    color: var(--color-grey600);
    font: var(--paragraph-14_16-regular);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  width: 160px;
  height: 110px;
`;
