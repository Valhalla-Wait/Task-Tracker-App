/* eslint-disable indent */
import React from 'react';
import { Select as SelectAnt } from 'antd';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { PrioritiesSelectors, PrioritiesEffects, PrioritiesTypes, OneTaskSelectors } from 'store';
import { Helpers } from 'shared';
import s from './priority.module.css';

const { getBgPriority } = Helpers;

const { Option } = SelectAnt;

type PrioritiesSelectPropsType = {
  priority: PrioritiesTypes.TaskPriorityType | null;
  taskId: string;
  statusId: string;
  checkRoles: { id: string; isAuthor: boolean; nameRole: string }[];
};

export const PrioritiesSelect: React.FC<PrioritiesSelectPropsType> = (props) => {
  const { priority, taskId, statusId, checkRoles } = props;

  const userId = Helpers.Cookies.getUserIdCookies();
  const checkAuthorRole = !checkRoles.filter((u) => u.isAuthor && u.id === userId).length;

  const dispatch = useDispatch();
  const options = useSelector(PrioritiesSelectors.prioritiesSelectorOptions);

  const handleChange = (value: PrioritiesTypes.prioritiesId | 'Не указан') => {
    if (value !== priority?.task_priority_id) {
      dispatch(
        PrioritiesEffects.changePriorities({
          data: { task_priority_id: value },
          taskId,
          statusId,
        }),
      );
    }
  };

  return (
    <Wrap>
      <Select
        bg={getBgPriority(priority?.task_priority_id ?? '')}
        bordered={false}
        disabled={checkAuthorRole}
        value={priority?.task_priority_id ?? 'Не указан'}
        onChange={handleChange}
        placement="bottomRight"
        options={options}
        dropdownClassName={s.option_priority}
        dropdownStyle={{
          minWidth: '105px',
          borderRadius: 8,
        }}
      >
        {options.map((el) => (
          <Option key={el.value} className={s.option_priority}>
            {el.label}
          </Option>
        ))}
      </Select>
    </Wrap>
  );
};

const Wrap = styled((props) => <div {...props} />)`
  width: 100%;
  height: 100%;

  .ant-select-selection-item {
    padding-right: 0px !important;
    color: var(--color-grey600) !important;
    font: var(--paragraph-14_16-regular) !important;
  }
  .ant-select-arrow {
    display: none;
  }
`;
const Select = styled((props) => <SelectAnt {...props} />)`
  position: relative;
  top: 8px;
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 0;
    display: inline-block;
    margin-right: 5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => props.bg};
  }
  ${({ disabled }) => {
    if (disabled) {
      return css`
        opacity: 0.3 !important;
      `;
    }
    return null;
  }}
`;
