import React, { useState } from 'react';
import { Input as InputAntd, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { OneTaskEffects, OneTaskSelectors } from 'store';
import styled from 'styled-components';
import { Icons } from 'shared';
import { Counter } from './Counter';

const { EditIcon } = Icons;

type TitleProps = {
  title: string;
  taskID: string;
};

export const Title: React.FC<TitleProps> = (props) => {
  const { title, taskID } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [newTitleTask, setNewTitleTask] = useState(title);
  const isAuthor = useSelector(OneTaskSelectors.currentUserIsAuthorSelector);

  const dispatch = useDispatch();

  const startEdit = () => {
    setIsEdit(true);
  };

  const onEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitleTask(e.target.value);
  };

  const endEdit = () => {
    if (newTitleTask !== '' && newTitleTask !== title) {
      dispatch(
        OneTaskEffects.oneTaskTitleChange({
          taskID,
          body: { title: newTitleTask },
        }),
      );
    } else {
      setNewTitleTask(title);
    }
    setIsEdit(false);
  };

  const isPressEsc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      setNewTitleTask(title);
      setIsEdit(false);
    }
  };

  return (
    <Wrap isEdit={isEdit}>
      {isEdit ? (
        <Input
          value={newTitleTask}
          placeholder="Название задачи не может быть пустым"
          showCount={{
            formatter: Counter,
          }}
          maxLength={100}
          bordered={false}
          onBlur={endEdit}
          onPressEnter={endEdit}
          onChange={onEdit}
          onKeyDown={isPressEsc}
          autoFocus
        />
      ) : (
        <Tooltip
          placement="right"
          overlayStyle={{ padding: '0', margin: '0' }}
          mouseLeaveDelay={0.3}
          className="title"
          visible={isAuthor ? undefined : false}
          title={
            <Button type="button" onClick={startEdit}>
              <EditIcon />
            </Button>
          }
        >
          {newTitleTask}
        </Tooltip>
      )}
    </Wrap>
  );
};

const Wrap = styled.div<{ isEdit: boolean }>`
  display: flex;
  width: ${(p) => (p.isEdit ? '100%' : 'auto')};
  max-width: calc(100% - (2 * 24px) - ${(p) => (p.isEdit ? '0px' : '30px')});
  margin-right: ${(p) => (p.isEdit ? 0 : '30px')};
  align-items: flex-start;
  font: var(--h2-24_32-medium);

  @media (max-width: 939px) {
    max-width: calc(100% - ${(p) => (p.isEdit ? '0px' : '30px')});
  }

  .title {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 4px 11px;
  }

  .ant-input {
    width: 100%;
    height: 32px;
    margin: 0 !important;
    padding: 0 !important;
  }

  .ant-input-suffix {
    align-items: flex-end;
  }
`;

const Input = styled(InputAntd)`
  position: sticky;
  width: 100%;
  font: var(--h2-24_32-medium);
`;

const Button = styled.button`
  padding: 8px 0;
  height: 24px;
  border: none;

  font: inherit;
  background-color: transparent;
  cursor: pointer;
`;
