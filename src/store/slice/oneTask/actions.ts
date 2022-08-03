// import { Types } from '..';
import { initialState } from './slice';
import { ReducerType } from './types';

export const resetOneTask = () => initialState;

export const changeData = (
  state: ReducerType,
  action: {
    payload: any; // Types.TaskCardType
    type: string;
  },
) => ({ ...state, data: action.payload });

export const setCurrentOneTaskId = (
  state: ReducerType,
  action: {
    payload: string;
    type: string;
  },
) => ({ ...state, currentTaskId: action.payload });
