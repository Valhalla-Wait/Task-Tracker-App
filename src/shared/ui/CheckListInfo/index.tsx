/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { CountIcon } from 'shared/icon';

export const CheckListInfo = (props: any) => {
  const { taskCheckListCompleted, taskCheckListTotal } = props;
  return (
    <>
      <span>
        {taskCheckListCompleted}/{taskCheckListTotal}
      </span>

      <CountIcon />
    </>
  );
};
