import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OneTaskEffects, OneTaskSelectors, Types } from 'store';
import styled from 'styled-components';
import { CheckItem } from './CheckItem';

type CheckItemsProps = {
  checkListID: string;
  items: Types.CheckListItemType[];
};

export const CheckItems: React.FC<CheckItemsProps> = (props) => {
  const { checkListID, items } = props;
  const dispatch = useDispatch();

  const checkObserverRole = useSelector(OneTaskSelectors.currentUserIsObserverSelector);
  const checkUnknownRole = useSelector(OneTaskSelectors.currentUserIsUnknownSelector);

  const setItemStatus = (e: CheckboxChangeEvent, itemID: string) => {
    dispatch(
      OneTaskEffects.checkListItemComleteChange({
        body: { complete: e.target.checked },
        checkListID,
        itemID,
      }),
    );
  };

  return (
    <>
      {items.map((item) => (
        <Wrap key={item.check_list_item_id}>
          <Check>
            <Checkbox
              disabled={checkObserverRole || checkUnknownRole}
              checked={item.complete}
              onChange={(e) => setItemStatus(e, item.check_list_item_id)}
            />
          </Check>

          <CheckItem item={item} checkListID={checkListID} />
        </Wrap>
      ))}
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0;
  padding: 0;
  align-items: center;
`;

const Check = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 30px;
  margin-right: 16px;
  align-items: center;
  justify-content: center;
`;
