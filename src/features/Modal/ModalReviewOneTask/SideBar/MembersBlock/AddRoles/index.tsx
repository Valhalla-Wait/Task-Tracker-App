import { Button, Popover } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helpers } from 'shared';
import { OneTaskSelectors, RolesEffects, Types } from 'store';
import styled from 'styled-components';

const { messagePopoverObserver, messagePopoverResponsible } = Helpers;

type AddRolesPropsType = {
  id: string;
  taskId: string;
  isDisabledObserver: boolean;
  isDisabledResponsible: boolean;
};

export const AddRoles: React.FC<AddRolesPropsType> = (props) => {
  const { id, taskId, isDisabledResponsible, isDisabledObserver } = props;
  const dispatch = useDispatch();

  const userAuthor = useSelector(OneTaskSelectors.userAuthorSelector);
  const userObserver = useSelector(OneTaskSelectors.userObserverSelector);
  const userResponsible = useSelector(OneTaskSelectors.userResponsibleSelector);

  const assingRolesObserver = () => {
    dispatch(
      RolesEffects.assingRoles({
        data: {
          assign_user_id: id,
          task_role_id: Types.RolesId.observer,
        },
        taskId,
      }),
    );
  };
  const assingRolesResponsible = () => {
    dispatch(
      RolesEffects.assingRoles({
        data: {
          assign_user_id: id,
          task_role_id: Types.RolesId.responsible,
        },
        taskId,
      }),
    );
  };

  return (
    <AddRolesWrap>
      <Popover content={messagePopoverObserver(id, userObserver, userResponsible, userAuthor)}>
        <Button
          disabled={isDisabledObserver}
          size="small"
          type="primary"
          onClick={assingRolesObserver}
        >
          Наблюдатель
        </Button>
      </Popover>
      <Popover content={messagePopoverResponsible(id, userObserver, userResponsible, userAuthor)}>
        <Button
          disabled={isDisabledResponsible}
          size="small"
          type="primary"
          onClick={assingRolesResponsible}
        >
          Исполнитель
        </Button>
      </Popover>
    </AddRolesWrap>
  );
};

const AddRolesWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .ant-btn-primary {
    border-radius: 5px;
    width: 114px;
  }
`;
