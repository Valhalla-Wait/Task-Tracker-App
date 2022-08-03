import { Checkbox, Radio, RadioChangeEvent } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from 'shared';
import { FilterActions, FilterSelectors } from 'store';
import styled from 'styled-components';

const { SomeOnesActivity, LatestActivity } = Icons;

export const AssignToMe = () => {
  const dispatch = useDispatch();

  const filterAssignToMe = useSelector(FilterSelectors.isAssignToMe);

  const changeHandler = (e: RadioChangeEvent) => {
    if (e.target.value) dispatch(FilterActions.setAssignToMe());
    else dispatch(FilterActions.removeAssignToMe());
  };

  return (
    <Wrap value={filterAssignToMe} onChange={changeHandler}>
      <Radio.Button className="all btn" value={false} type="text">
        <LatestActivity color="#FF9700" />
        <p>Все</p>
      </Radio.Button>
      <Radio.Button className="my btn" value type="text">
        <SomeOnesActivity color="#A461D8" />
        <p>Назначенные мне</p>
      </Radio.Button>
    </Wrap>
  );
};

const Wrap = styled(Radio.Group)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 40px;

  .ant-radio-button-checked {
    background: var(--color-grey200);
    border-radius: 8px;
    color: var(--color-grey800);
  }
  .btn {
    border: none;
    font: var(--paragraph-14_24-semibold);
    color: var(--color-grey800);

    p {
      margin-bottom: 0;
      margin-left: 10px;
    }

    ::before {
      display: none;
    }
    span + span {
      display: flex;
      padding: 6px;
      align-items: flex-end;
    }
  }

  .all {
    width: 94px;
    height: 36px;
  }
  .my {
    width: 176px;
    height: 36px;
  }
  .ant-radio-group {
    display: flex;
    width: 100%;
  }
  .ant-radio-button-wrapper {
    display: flex;
    padding: 0;
    box-shadow: none !important;

    :hover {
      color: var(--color-grey800);
    }
  }
`;
