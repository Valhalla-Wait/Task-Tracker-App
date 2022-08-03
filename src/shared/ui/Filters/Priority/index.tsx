import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterActions, FilterSelectors, PrioritiesSelectors, PrioritiesTypes } from 'store';
import styled from 'styled-components';

export const Priority = () => {
  const dispatch = useDispatch();

  const allPriorities = useSelector(PrioritiesSelectors.data).map((priority) => ({
    value: priority.task_priority_id,
    label: priority.name,
  }));
  const filterPriorities = useSelector(FilterSelectors.priorities);

  const onChangeHandler = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.length) {
      dispatch(FilterActions.setPriorities(checkedValues as PrioritiesTypes.prioritiesId[]));
    } else dispatch(FilterActions.removePriorities());
  };

  return (
    <Wrap>
      <p className="title">ПРИОРИТЕТ</p>
      <Checkbox.Group value={filterPriorities} onChange={onChangeHandler} options={allPriorities} />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 40px;

  .title {
    color: var(--color-grey700);
    font: var(--h6-12_16-bold);
    margin-bottom: 15px;
  }

  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--color-success-default);
    border-color: var(--color-success-default);
  }

  .ant-checkbox-wrapper {
    height: 24px;
    margin: 0 0 12px 0;
    align-items: baseline;
    color: var(--color-grey800);
    font: var(--paragraph-14_20-regular);
  }
`;
