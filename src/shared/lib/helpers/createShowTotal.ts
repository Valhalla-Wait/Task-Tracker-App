import { Types } from 'store';

export const createShowTotal = (
  total: number,
  range: number[],
  status: Types.ReducerStatusType,
) => {
  if (status === 'success') {
    return `${range[0] === range[1] ? range[0] : `${range[0]} - ${range[1]}`} из ${total}
      задач${String(total).slice(-2) !== '11' && String(total).slice(-1) === '1' ? 'и' : ''}`;
  }
  return '';
};
