/* eslint-disable camelcase */
import React from 'react';
import { EllipsisOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Dropdown, Modal } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { OneTaskEffects, OperationsTaskEffects } from 'store';
import { Helpers } from 'shared/lib';

const { confirm } = Modal;

type EditorSelectPropsType = {
  taskId: string;
  statusId: string;
  checkRoles: { id: string; isAuthor: boolean; nameRole: string }[];
};

export const EditorSelect: React.FC<EditorSelectPropsType> = (props) => {
  const { taskId, statusId, checkRoles } = props;
  const userId = Helpers.Cookies.getUserIdCookies();
  const role = checkRoles.filter(({ id, isAuthor }) => id === userId && isAuthor);
  const dispatch = useDispatch();
  const removeTaskHandler = () => {
    if (taskId && statusId) {
      confirm({
        width: '450px',
        wrapClassName: 'DelConfirm',
        title: 'Вы действительно хотите удалить задачу?',
        icon: <ExclamationCircleFilled />,
        centered: true,
        okText: 'Да',
        okType: 'danger',
        cancelText: 'Нет',
        onOk() {
          dispatch(OperationsTaskEffects.deleteTask({ taskId, statusId }));
        },
      });
    }
  };
  const openModal = () => {
    dispatch(OneTaskEffects.fetchOneTask(taskId));
  };

  const Menu = (
    <Ul>
      <li>
        <button type="button" onClick={openModal}>
          Редактировать
        </button>
      </li>
      {!!role.length && (
        <>
          <li>
            <button
              onClick={() =>
                dispatch(
                  OperationsTaskEffects.duplicateTask({
                    taskId,
                    statusId,
                  }),
                )
              }
              type="button"
            >
              Дублировать
            </button>
          </li>
          <li className="item-delite">
            <button className="btn-delite" onClick={removeTaskHandler} type="button">
              Удалить
            </button>
          </li>
        </>
      )}
    </Ul>
  );
  return (
    <Dropdown placement="bottomRight" overlay={Menu} trigger={['click']}>
      <EllipsisOutlined />
    </Dropdown>
  );
};

const Ul = styled.ul`
  padding: 0;
  background-color: var(--color-grey0);
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  list-style-type: none;
  li {
    cursor: pointer;
  }
  li:hover {
    background-color: #f5f5f5;
  }
  button {
    border: none;
    background: none;
    padding: 0px;
    margin: 0px;
    cursor: pointer;
    font: var(--paragraph-14_20-regular);
    color: var(--color-grey800);
    padding: 7px 20px 7px 15px;
    width: 100%;
    text-align: left;
  }
  border-radius: 8px;
  .item-delite {
    border-top: 1px solid #d5d5dc;
  }
  .btn-delite {
    color: var(--color-red);
    font-weight: 600;
  }
`;
