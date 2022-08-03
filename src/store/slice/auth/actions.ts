import { Helpers } from 'shared';
import { ReducerType } from './types';

export const setTokenAction = (
  state: ReducerType,
  action: {
    payload: string;
    type: string;
  },
) => ({ ...state, token: action.payload });

export const removeTokenAction = (state: ReducerType) => {
  Helpers.Cookies.removeTokenCookies();

  return { ...state, token: '' };
};
