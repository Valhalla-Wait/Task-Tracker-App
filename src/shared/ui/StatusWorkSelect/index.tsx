/* eslint-disable camelcase */
import React from 'react';
import { Select as SelectAnt } from 'antd';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { StatusesEffects, StatusesSelectors, StatusesTypes } from 'store';
import { Helpers } from 'shared';
import s from './status.module.css';

const { getBgStatus } = Helpers;

const { Option } = SelectAnt;

type StatusWorkSelectPropsType = {
  status: Datum;
  taskId: string;
  checkRoles: { id: string; isAuthor: boolean; nameRole: string }[];
};

type Datum = {
  task_status_id: string;
  name: string;
  form_result_required: boolean;
};

export const StatusWorkSelect: React.FC<StatusWorkSelectPropsType> = (props) => {
  const {
    status: { name, task_status_id },
    taskId,
    checkRoles,
  } = props;
  const dispatch = useDispatch();
  const optionsBefore = useSelector(StatusesSelectors.statusesSelectorOptionsBefore);
  const optionsAfter = useSelector(StatusesSelectors.statusesSelectorOptionsAfter);
  const userId = Helpers.Cookies.getUserIdCookies();

  const roleAth = checkRoles.filter(({ id, isAuthor }) => id === userId && isAuthor);
  const roleObs = checkRoles.filter(({ nameRole }) => nameRole === 'Наблюдатель');
  const roleEx = checkRoles.filter(({ nameRole }) => nameRole === 'Исполнитель');
  const roleRes = checkRoles.filter(({ nameRole }) => nameRole === 'Ответственный');
  const roleId = checkRoles.map(({ id }) => id);

  const handleChange = (
    value: string,
    obj: { children: string; className: string; disabled: boolean; key: string; value: string },
  ) => {
    if (value !== name) {
      dispatch(StatusesEffects.changeStatuses({ data: { task_status_id: obj.key }, taskId }));
    }
    console.log(obj);
  };
  const disabledStatuses2 = () => {
    if (
      roleObs.map((el) => el.id).includes(userId) ||
      !roleId.includes(userId) ||
      roleEx.map((el) => el.id).includes(userId) ||
      (roleRes.map((el) => el.id).includes(userId) &&
        (name === 'Не выполнена' || name === 'Выполнена' || name === 'Отклонена'))
    ) {
      return true;
    }

    return false;
  };

  const disabledStatuses = (label: string) => {
    if (roleAth.length) {
      return false;
    }
    if (roleEx.map((el) => el.id).includes(userId) || roleRes.map((el) => el.id).includes(userId)) {
      if (label === 'Создана' && task_status_id === StatusesTypes.statusesId.inWork) {
        return true;
      }

      if (
        (label === 'Не выполнена' ||
          label === 'Отклонена' ||
          label === 'Выполнена' ||
          label === 'В работе' ||
          label === 'Создана') &&
        task_status_id === StatusesTypes.statusesId.completed
      ) {
        return true;
      }
    }

    return false;
  };

  return (
    <Select
      disabled={disabledStatuses2()}
      bg={getBgStatus(task_status_id)}
      bordered={false}
      value={name}
      onChange={handleChange}
      dropdownStyle={{
        minWidth: '160px',
        textTransform: 'uppercase',
        borderRadius: 8,
      }}
    >
      <>
        {optionsBefore.map((el) => (
          <Option
            value={el.label}
            key={el.value}
            disabled={disabledStatuses(el.label)}
            className={s.option_status}
          >
            {el.label}
          </Option>
        ))}
        {optionsAfter.map((el) => (
          <Option
            value={el.label}
            disabled={disabledStatuses(el.label)}
            className={s.option_status}
            style={{ borderTop: '1px solid #D5D5DC' }}
            key={el.value}
          >
            {el.label}
          </Option>
        ))}
      </>
    </Select>
  );
};

const Select = styled((props) => <SelectAnt {...props} />)`
  width: 100%;
  height: 100%;

  .option_custom {
    text-transform: uppercase !important;
  }

  .ant-select-selection-item {
    padding-right: 0px !important;
    color: var(--color-grey0) !important;
  }
  .ant-select-arrow {
    display: none;
  }

  ${({ disabled }) => {
    if (disabled) {
      return css`
        opacity: 0.3 !important;
      `;
    }
    return null;
  }}

  text-transform: uppercase;
  font: var(--h6-12_16-bold);
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: var(--color-grey0);
  background: ${(props) => props.bg};
  border-radius: 16px;
`;
