import moment from 'moment';
import { PrioritiesTypes, StatusesTypes } from 'store';

export const diffDate = (oldDate: string) => {
  const createDataM = new Date();
  const stopDateCorrect = moment(oldDate);
  const diffStopDateM = stopDateCorrect.diff(createDataM);
  if (Math.floor(diffStopDateM / 60000) < 1) {
    return true;
  }
  return false;
};

export const changeColor = (oldDate: string) => {
  const createDataM = new Date();
  const stopDateCorrect = moment(oldDate);
  const diffStopDateM = stopDateCorrect.diff(createDataM);
  if (Math.floor(diffStopDateM / 3600000) < 24) {
    return '#ff0b0bc5';
  }
  return '#000';
};

export const getBgSubscribes = (type: boolean) => {
  switch (type) {
    case false:
      return '#0062ff';
    case true:
      return '#ffffff';
    default:
      return null;
  }
};

export const getBgStatus = (type: string) => {
  switch (type) {
    case StatusesTypes.statusesId.created:
      return '#0062ff';
    case StatusesTypes.statusesId.inWork:
      return '#3dd598';
    case StatusesTypes.statusesId.completed:
      return '#a461d8';
    case StatusesTypes.statusesId.notCompleted:
      return '#ff974a';
    case StatusesTypes.statusesId.rejected:
      return '#ff0b37';
    default:
      return null;
  }
};

export const getValue = (value: string) => {
  switch (value) {
    case 'Создана':
      return StatusesTypes.statusesId.created;
    case 'В работе':
      return StatusesTypes.statusesId.inWork;
    case 'Выполнена':
      return StatusesTypes.statusesId.completed;
    case 'Не выполнена':
      return StatusesTypes.statusesId.notCompleted;
    case 'Отклонена':
      return StatusesTypes.statusesId.rejected;
    default:
      return null;
  }
};

export const getBgPriority = (type: string) => {
  switch (type) {
    case PrioritiesTypes.prioritiesId.high:
      return '#fc5a5a';
    case PrioritiesTypes.prioritiesId.medium:
      return '#ff974a';
    case PrioritiesTypes.prioritiesId.low:
      return '#4a5cff';
    default:
      return '#bbbaba';
  }
};

export const getValuePr = (value: string) => {
  switch (value) {
    case 'Высокий':
      return PrioritiesTypes.prioritiesId.high;
    case 'Средний':
      return PrioritiesTypes.prioritiesId.medium;
    case 'Низкий':
      return PrioritiesTypes.prioritiesId.low;
    default:
      return null;
  }
};
