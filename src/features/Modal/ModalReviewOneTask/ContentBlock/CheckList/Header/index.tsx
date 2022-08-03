import { Input, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icons, Helpers } from 'shared';
import { OneTaskEffects, OneTaskSelectors } from 'store';
import styled from 'styled-components';

const { CheckListIcon, EditIcon, CloseIcon } = Icons;

type HeaderProps = {
  title: string;
  checkListID: string;
  taskID: string;
  isEmpty: boolean;
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { title, checkListID, taskID, isEmpty } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useDispatch();

  const checkAuthorRole = useSelector(OneTaskSelectors.currentUserIsAuthorSelector);
  const checkExecutorRole = useSelector(OneTaskSelectors.currentUserIsExecutorSelector);
  const checkObserverRole = useSelector(OneTaskSelectors.currentUserIsObserverSelector);
  const checkUnknownRole = useSelector(OneTaskSelectors.currentUserIsUnknownSelector);

  const startEdit = () => {
    setIsEdit(true);
  };

  const onEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const endEdit = () => {
    if (newTitle !== '' && newTitle !== title) {
      dispatch(
        OneTaskEffects.checkListTitleChange({
          checkListID,
          newTitle,
        }),
      );
    } else {
      setNewTitle(title);
    }
    setIsEdit(false);
  };

  const removeCheckList = () => {
    if (isEmpty) {
      dispatch(
        OneTaskEffects.unassignCheckListToTask({
          taskID,
          body: { check_list_id: checkListID },
        }),
      );
    } else {
      Modal.warn({
        title: 'Чек-лист не может быть уделён.',
        content: 'Для удаления чек-листа удалите из него все пункты.',
        width: '350px',
        centered: true,
      });
    }
  };

  const isPressEsc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      setIsEdit(false);
    }
  };

  return (
    <Wrap>
      <Check>
        <CheckListIcon />
      </Check>

      <TitleBox>
        <Title>
          {isEdit ? (
            <Input
              value={newTitle}
              bordered={false}
              onBlur={endEdit}
              onPressEnter={endEdit}
              onChange={onEdit}
              onKeyDown={isPressEsc}
              autoFocus
            /> //
          ) : (
            <Tooltip
              placement="right"
              overlayStyle={{ padding: '0', margin: '0' }}
              mouseLeaveDelay={0.3}
              className="title"
              title={
                checkAuthorRole || checkExecutorRole ? (
                  <Button type="button" onClick={startEdit}>
                    <EditIcon />
                  </Button>
                ) : (
                  ''
                )
              }
            >
              {newTitle}
            </Tooltip>
          )}
        </Title>

        <Close>
          <Button
            disabled={checkObserverRole || checkUnknownRole}
            type="button"
            onClick={removeCheckList}
          >
            <CloseIcon />
          </Button>
        </Close>
      </TitleBox>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: flex-end;
`;

const Check = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 30px;
  margin-right: 16px;
  align-items: center;
  justify-content: center;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: calc(100% - (30px + 16px));
`;

const Title = styled.div`
  display: flex;
  max-width: calc(100% - (30px + 16px) - 30px);
  align-items: flex-start;
  font: var(--h5-16_24-medium);
  color: var(--color-grey900);
  margin-right: 30px;

  .title {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ant-input {
    width: 100%;
    font: var(--h5-16_24-medium);
    color: var(--color-grey900);
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const Close = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 30px;
  margin-left: 7px !important;
  align-items: center;
  justify-content: center;
  button {
    :disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }
  }
`;

const Button = styled.button`
  padding: 0;
  border: none;
  font: inherit;
  background-color: transparent;
  cursor: pointer;
`;
