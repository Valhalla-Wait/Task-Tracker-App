import { historySlice } from './slice';

export * as Selectors from './selectors';
export const { actions, reducer } = historySlice;
export * as Effects from './effects';
export * as Types from './types';
