import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { FilterActions, FilterSelectors } from 'store';
import styled from 'styled-components';

export const Attachment = () => {
  const dispatch = useDispatch();

  const filterAttachment = useSelector(FilterSelectors.isAttachment);

  const changeHandler = (e: CheckboxChangeEvent) => {
    if (e.target.checked) dispatch(FilterActions.setAttachment());
    else dispatch(FilterActions.removeAttachment());
  };

  return (
    <Wrap>
      <p className="title">ДРУГИЕ</p>
      <Checkbox checked={filterAttachment} onChange={changeHandler}>
        С вложениями
      </Checkbox>
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

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--color-success-default);
    border-color: var(--color-success-default);
  }

  .ant-checkbox-wrapper {
    color: var(--color-grey800);
    font: var(--paragraph-14_20-regular);
  }
`;
