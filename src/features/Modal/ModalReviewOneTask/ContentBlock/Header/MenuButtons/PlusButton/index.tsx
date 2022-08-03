import React from 'react';
import { Dropdown, Menu, MenuProps, Popover, Upload, Modal } from 'antd';
import { AttachingFilesEffects, OneTaskEffects } from 'store';
import { useDispatch } from 'react-redux';
import { Icons } from 'shared';

const { PlusIcon } = Icons;

type PlusButtonProps = {
  isCheckList: boolean;
  taskID: string;
  attachmentsFilesMaxCount: boolean;
};

export const PlusButton: React.FC<PlusButtonProps> = (props) => {
  const { isCheckList, taskID, attachmentsFilesMaxCount } = props;
  const dispatch = useDispatch();

  const plusMenuHandler: MenuProps['onClick'] = (e) => {
    if (e.key === 'add_check-list') {
      dispatch(
        OneTaskEffects.checkListCreate({
          body: {
            title: 'Чек-лист',
          },
          taskID,
        }),
      );
    }
  };

  const upload = (file: any) => {
    if (file.file.size > 2097152) {
      Modal.error({
        title: 'Файл не может быть добавлен.',
        content: 'Макимальный размер файла 2 МБ',
        centered: true,
      });
    } else {
      const formDataFile = new FormData();
      formDataFile.append('file', file.file);
      dispatch(
        AttachingFilesEffects.attachFileToTask({
          name_original: file.file.name,
          file: formDataFile,
          task_id: taskID,
          file_type: file.file.type,
        }),
      );
    }
  };

  return (
    <Dropdown
      overlay={
        <Menu onClick={plusMenuHandler}>
          <Menu.Item key="add_check-list" disabled={isCheckList}>
            {isCheckList ? (
              <Popover
                content={
                  <span>
                    Добавлено максимальное
                    <br />
                    количество чек-листов
                  </span>
                }
                placement="leftTop"
              >
                <div>Добавить чек-лист</div>
              </Popover>
            ) : (
              <div>Добавить чек-лист</div>
            )}
          </Menu.Item>

          {attachmentsFilesMaxCount ? (
            <Menu.Item disabled={attachmentsFilesMaxCount}>
              <Popover
                content={
                  <span>
                    Добавлено максимальное
                    <br />
                    количество вложений
                  </span>
                }
                placement="leftTop"
              >
                <div>Прикрепить вложение</div>
              </Popover>
            </Menu.Item>
          ) : (
            <Upload
              customRequest={(file) => upload(file)}
              listType="picture"
              showUploadList={false}
              accept=".doc,.docx,.pdf,.txt,.ppt,.gif,.png"
              disabled={attachmentsFilesMaxCount}
            >
              <Menu.Item>Прикрепить вложение</Menu.Item>
            </Upload>
          )}
        </Menu>
      }
      placement="bottomRight"
      trigger={['click']}
    >
      <div>
        <PlusIcon />
      </div>
    </Dropdown>
  );
};
