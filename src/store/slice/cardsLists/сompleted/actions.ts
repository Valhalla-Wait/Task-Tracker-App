import { Types } from 'store';

export const setSortAction = (
  state: Types.TasksListReducerType,
  action: {
    payload: Types.sortMethods;
    type: string;
  },
) => ({ ...state, sort: action.payload });
