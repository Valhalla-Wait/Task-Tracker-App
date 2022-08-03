import React from 'react';
import { Avatar, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FilterActions, FilterSelectors, UsersSelectors } from 'store';
import styled from 'styled-components';

export const Members = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(UsersSelectors.usersSelector);
  const members = useSelector(FilterSelectors.members);

  const onChangeHandler = (value: string[]) => {
    if (value.length) dispatch(FilterActions.setMembers(value));
    else dispatch(FilterActions.removeMembers());
  };

  return (
    <Wrap>
      <p>УЧАСТНИКИ</p>
      <Select
        mode="multiple"
        placeholder="Выберите ..."
        value={members}
        onChange={onChangeHandler}
        style={{ width: '100%' }}
        optionLabelProp="label"
        optionFilterProp="label"
        allowClear
        notFoundContent={<div>Не найдено</div>}
      >
        {allUsers.map((user) => (
          <Select.Option key={user.user_id} value={user.user_id} label={user.name}>
            <Avatar
              src={user.logo}
              style={{ background: user.color, marginRight: '10px' }}
              icon={user.initials}
              onError={() => true}
            />
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin-bottom: 40px;

  .ant-select-selector {
    border-radius: 8px !important;
    background: var(--color-grey100) !important;
    min-height: 38px;
  }

  p {
    color: var(--color-grey700);
    font: var(--h6-12_16-bold);
    margin-bottom: 15px;
  }
`;
