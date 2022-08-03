/* eslint-disable no-unused-expressions */
import React from 'react';
import { DatePicker as DatePickerAnt, Spin } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { OperationsTaskEffects, OperationsTaskSelectors } from 'store';
import { Helpers } from 'shared/lib';
import { RangePickerProps } from 'antd/lib/date-picker';

const { changeColor } = Helpers;

type DatePickerCustomProps = {
  stopDate: string;
  taskId: string;
  checkRoles: { id: string; isAuthor: boolean; nameRole: string }[];
};

export const DatePickerCustom: React.FC<DatePickerCustomProps> = (props) => {
  const { stopDate, taskId, checkRoles } = props;

  const status = useSelector(OperationsTaskSelectors.createTaskStatusSelector);

  const userId = Helpers.Cookies.getUserIdCookies();

  const roleAth = checkRoles.filter(({ id, isAuthor }) => id === userId && isAuthor);

  const disabledDatePic = () => !roleAth.length;

  const dispatch = useDispatch();

  const dispatchFunk = (value: string) => {
    dispatch(
      OperationsTaskEffects.changeDateStop({
        data: { exec_stop: moment(value).format('MM/DD/YYYY, HH:mm:ss') },
        taskId,
      }),
    );
  };
  const changeTimeStop = (value: string) => dispatchFunk(value);

  const isPressEnter = (value: string) => {
    window.addEventListener('keyup', (event: KeyboardEvent) => {
      event.keyCode === 13 ? dispatchFunk(value) : '';
    });
  };

  return (
    <Spin spinning={status === 'loading'}>
      <DatePicker
        inputReadOnly
        onChange={changeTimeStop}
        disabled={disabledDatePic()}
        disabledDate={disabledDate}
        disabledTime={disabledDateTime}
        color={changeColor(stopDate)}
        locale={locale}
        format="D MMM YYYY, HH:mm"
        showTime
        onOk={isPressEnter}
        defaultValue={stopDate ? moment(stopDate, 'YYYY MM DD, HH:mm') : undefined}
        placeholder="Выберете дату"
      />
    </Spin>
  );
};

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current.isBefore(moment().subtract(1, 'day'));

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
};

const disabledDateTime = () => {
  const date = new Date();
  const hours = date.getHours();
  return {
    disabledHours: () => range(0, 24).splice(0, hours + 1),
  };
};

const DatePicker = styled((props) => <DatePickerAnt {...props} />)`
  .ant-picker-input {
    flex-direction: row-reverse;
    gap: 2px;
  }
  .ant-picker-input > input {
    color: ${(props) => props.color};
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
