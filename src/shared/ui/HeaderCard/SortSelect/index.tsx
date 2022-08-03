import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  AtWorkListEffects,
  CompletedListEffects,
  IncomingListEffects,
  NotCompletedListEffects,
  RejectedListEffects,
  StatusesTypes,
  Types,
} from 'store';

const { Option } = Select;

export const SortSelect = (props: Types.SortOptionsType) => {
  const dispatch = useDispatch();
  const { listSort, taskStatus } = props;
  const { created, inWork, completed, notCompleted, rejected } = StatusesTypes.statusesId;

  const fetchWithSort = (sort: Types.sortMethods) => {
    switch (taskStatus) {
      case created:
        dispatch(IncomingListEffects.fetchAll({ sort }));
        break;
      case inWork:
        dispatch(AtWorkListEffects.fetchAll({ sort }));
        break;
      case completed:
        dispatch(CompletedListEffects.fetchAll({ sort }));
        break;
      case notCompleted:
        dispatch(NotCompletedListEffects.fetchAll({ sort }));
        break;
      case rejected:
        dispatch(RejectedListEffects.fetchAll({ sort }));
        break;
      default:
        break;
    }
  };

  return (
    <Wrap>
      <Select
        bordered={false}
        value={listSort}
        dropdownClassName="DropdownClass"
        onSelect={fetchWithSort}
      >
        <Option value={Types.sortMethods.date}>дате создания</Option>
        <Option value={Types.sortMethods.title}>наименованию</Option>
      </Select>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;

  .ant-select {
    display: inline-block;
    width: 130px;
  }
  .ant-select-selector {
    border: none !important;
    left: -14px;
  }
  .ant-select-selection-item {
    background: none;
    padding-right: 0px !important;
    font: var(--paragraph-14_24-semibold);
    color: var(--color-grey800);
    margin-top: -3px;
  }
  .ant-select-arrow {
    span {
      display: none;
    }
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid #92929d;
    top: 16px;
    right: 12px;
  }
  display: inline-block !important;
`;
