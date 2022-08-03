/* eslint-disable func-names */
import moment from 'moment';

export const operationsDate = (oldDate: string | undefined) => {
  let newDate;
  moment.fn.fromNow = function () {
    const duration: any = moment().diff(this, 'hours');
    return duration;
  };
  if (+moment(oldDate).fromNow() < 25) {
    newDate = moment(oldDate).calendar();
    return newDate;
  }

  newDate = moment(oldDate).format('D MMM YYYY, hh:mm');
  return newDate;
};
