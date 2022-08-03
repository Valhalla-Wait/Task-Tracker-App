import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import {
  atWorkListReducer,
  authReducer,
  notCompletedListReducer,
  tagsReducer,
  incomingListReducer,
  statusesReducer,
  prioritiesReducer,
  completedListReducer,
  rejectedListReducer,
  oneTaskReducer,
  operationsTaskReducer,
  profileReducer,
  attachingFilesReducer,
  usersReducer,
  rolesReducer,
  historyReducer,
  subscribesReducer,
  countSubscribesReducer,
  filterReducer,
} from './slice';

const rootReducer = combineReducers({
  auth: authReducer,
  statuses: statusesReducer,
  priorities: prioritiesReducer,
  tags: tagsReducer,
  atWorkList: atWorkListReducer,
  notCompletedList: notCompletedListReducer,
  incomingList: incomingListReducer,
  сompletedList: completedListReducer,
  rejectedList: rejectedListReducer,
  oneTask: oneTaskReducer,
  operationsTask: operationsTaskReducer,
  profile: profileReducer,
  attachingFiles: attachingFilesReducer,
  users: usersReducer,
  roles: rolesReducer,
  history: historyReducer,
  subscribes: subscribesReducer,
  countSubscribes: countSubscribesReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type RootStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
