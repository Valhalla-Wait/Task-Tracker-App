import { Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icons, Helpers } from 'shared';
import { OneTaskEffects, OneTaskSelectors, Types } from 'store';
import styled from 'styled-components';

const { EditIcon, DeleteIcon } = Icons;

type CheckItemProps = {
  item: Types.CheckListItemType;
  checkListID: string;
};

export const CheckItem: React.FC<CheckItemProps> = (props) => {
  const { item, checkListID } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [newMessage, setNewMessage] = useState(item.message);
  const dispatch = useDispatch();

  const checkAuthorRole = useSelector(OneTaskSelectors.currentUserIsAuthorSelector);
  const checkExecutorRole = useSelector(OneTaskSelectors.currentUserIsExecutorSelector);
  const startEdit = () => {
    setIsEdit(true);
  };

  const onEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const endEdit = () => {
    if (newMessage !== '' && newMessage !== item.message) {
      dispatch(
        OneTaskEffects.checkListItemRename({
          checkListID,
          itemID: item.check_list_item_id,
          body: { message: newMessage },
        }),
      );
    } else {
      setNewMessage(item.message);
    }
    setIsEdit(false);
  };

  const removeCheckListItem = () => {
    dispatch(
      OneTaskEffects.checkListItemDelete({
        checkListID,
        itemID: item.check_list_item_id,
      }),
    );
  };

  const isPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') setIsEdit(false);
  };

  return (
    <Wrap isDone={item.complete}>
      {isEdit ? (
        <Input.TextArea
          value={newMessage}
          bordered={false}
          onBlur={endEdit}
          onPressEnter={endEdit}
          autoSize
          onChange={onEdit}
          onKeyDown={isPressEnter}
          autoFocus
        />
      ) : (
        <Tooltip
          placement="right"
          overlayStyle={{ padding: '0', margin: '0' }}
          mouseLeaveDelay={0.3}
          className="title"
          title={
            checkAuthorRole || checkExecutorRole ? (
              <>
                <Button type="button" className="edit" onClick={startEdit}>
                  <EditIcon />
                </Button>

                <Button type="button" onClick={removeCheckListItem}>
                  <DeleteIcon />
                </Button>
              </>
            ) : (
              ''
            )
          }
        >
          {newMessage}
        </Tooltip>
      )}
    </Wrap>
  );
};

type CaptionProps = {
  isDone: boolean;
};

const Wrap = styled.div<CaptionProps>`
  display: flex;
  align-items: flex-start;
  font: var(--h5-16_24-regular);
  color: var(--color-grey900);
  margin-right: 60px;
  width: calc(100% - 46px - 60px);

  .title {
    max-width: 100%;
    text-decoration: ${(p) => (p.isDone ? 'line-through' : 'none')};
    white-space: pre-wrap;
  }

  .ant-input {
    width: 100%;
    font: var(--h5-16_24-regular);
    color: var(--color-grey900);
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;
  align-items: center;
  justify-content: center;
  border: none;
  font: inherit;
  background-color: transparent;
  cursor: pointer;
`;
