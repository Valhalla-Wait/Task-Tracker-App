import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AtWorkListSelectors,
  CompletedListSelectors,
  FilterActions,
  FilterSelectors,
  IncomingListSelectors,
  NotCompletedListSelectors,
  RejectedListSelectors,
  StatusesSelectors,
  StatusesTypes,
} from 'store';
import styled from 'styled-components';

export const Status = () => {
  const dispatch = useDispatch();

  const statuses = useSelector(StatusesSelectors.statusesSelectorOptions);
  const filterStatuses = useSelector(FilterSelectors.statuses);

  const [showingStatuses, setShowingStatuses] = useState(filterStatuses);

  const completedItems = useSelector(CompletedListSelectors.itemsTotal);
  const atWorkItems = useSelector(AtWorkListSelectors.itemsTotal);
  const incomingItems = useSelector(IncomingListSelectors.itemsTotal);
  const notCompletedItems = useSelector(NotCompletedListSelectors.itemsTotal);
  const rejectedItems = useSelector(RejectedListSelectors.itemsTotal);

  useEffect(
    () => setShowingStatuses(filterStatuses.filter((id) => getTotal(id) !== 0)),
    [filterStatuses, completedItems, atWorkItems, incomingItems, notCompletedItems, rejectedItems],
  );

  const getTotal = (status: StatusesTypes.statusesId) => {
    switch (status) {
      case StatusesTypes.statusesId.created:
        return incomingItems;
      case StatusesTypes.statusesId.inWork:
        return atWorkItems;
      case StatusesTypes.statusesId.completed:
        return completedItems;
      case StatusesTypes.statusesId.notCompleted:
        return notCompletedItems;
      case StatusesTypes.statusesId.rejected:
      default:
        return rejectedItems;
    }
  };

  const getFormatTotal = (total: number) => {
    switch (true) {
      case total > 99:
        return '99+';
      case total < 0:
        return '';
      default:
        return total.toString();
    }
  };

  const onChangeHandler = (checkedValues: CheckboxValueType[]) => {
    dispatch(FilterActions.setStatus(checkedValues as StatusesTypes.statusesId[]));
  };

  return (
    <Wrap>
      <p>СТАТУС</p>
      <Checkbox.Group value={showingStatuses} onChange={onChangeHandler}>
        {statuses.map((status) => (
          <Checkbox value={status.value} disabled={!getTotal(status.value)} key={status.value}>
            <CheckboxLabel>
              {status.label}
              <div>
                {getFormatTotal(getTotal(status.value))}
              </div>
            </CheckboxLabel>
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin-bottom: 40px;

  p {
    color: var(--color-grey700);
    font: var(--h6-12_16-bold);
    margin-bottom: 15px;
  }

  .ant-checkbox-group {
    width: 100%;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--color-success-default);
    border-color: var(--color-success-default);
  }

  .ant-checkbox-wrapper {
    width: 100%;
    height: 24px;
    margin: 0 0 12px 0;
    align-items: baseline;

    span + span {
      width: 100%;
    }
  }
`;

const CheckboxLabel = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-grey800);
  font: var(--paragraph-14_20-regular);

  div {
    display: flex;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: var(--color-grey200);
    align-items: center;
    justify-content: center;
    color: var(--color-grey700);
    font: var(--mini-10_16-regular);
  }
`;
