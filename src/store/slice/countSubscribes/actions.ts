import { ReducerType, SubscribesCountResponseType } from './types';

export const newDataSubscribes = (
  state: ReducerType,
  action: {
    payload: SubscribesCountResponseType;
    type: string;
  },
) => ({ ...state, data: action.payload });
