import moment from 'moment';
import React from 'react';
import { DateIcon } from 'shared/icon';

export const DateInfo = ({ date }: any) => {
  const getFormatDate = (oldDate: string) => {
    const newDate = moment(oldDate).format('D MMM YYYY');
    return newDate;
  };

  return (
    <>
      <DateIcon />
      <span>
        {getFormatDate(date)}
      </span>
    </>
  );
};
