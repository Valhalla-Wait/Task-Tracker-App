import { createSelector } from '@reduxjs/toolkit';
import { Helpers } from 'shared';
import { RootStateType } from 'store';

const selectSelf = (state: RootStateType) => state.oneTask;

export const oneTaskSelector = createSelector(selectSelf, (oneTaskState) => oneTaskState.data);

export const oneTaskErrSelector = createSelector(selectSelf, (oneTaskState) => oneTaskState.error);

export const oneTaskStatusSelector = createSelector(
  selectSelf,
  (oneTaskState) => oneTaskState.status,
);

export const userInfoSelector = createSelector(selectSelf, (oneTaskState) =>
  oneTaskState.data.roles.map((el) => ({
    id: el.assign_user.user_id,
    isAuthor: el.task_role.is_author,
    roleName: el.task_role.name,
    name: el.assign_user.name,
    logo: el.assign_user.logo,
  })),
);

export const userInfoIdSelector = createSelector(selectSelf, (oneTaskState) =>
  oneTaskState.data.roles.map((el) => el.assign_user.user_id),
);

export const userAuthorSelector = createSelector(selectSelf, (oneTaskState) =>
  oneTaskState.data.roles
    .map((el) => ({
      id: el.assign_user.user_id,
      isAuthor: el.task_role.is_author,
      roleName: el.task_role.name,
      name: el.assign_user.name,
      logo: el.assign_user.logo,
    }))
    .filter(({ roleName }) => roleName === 'Автор задачи'),
);

export const currentUserIsAuthorSelector = createSelector(selectSelf, (oneTaskState) =>
  oneTaskState.data.roles
    .map((el) => ({
      id: el.assign_user.user_id,
      isAuthor: el.task_role.is_author,
      roleName: el.task_role.name,
      name: el.assign_user.name,
      logo: el.assign_user.logo,
    }))
    .some(
      ({ roleName, id }) =>
        roleName === 'Автор задачи' && id === Helpers.Cookies.getUserIdCookies(),
    ),
);
export const currentUserIsObserverSelector = createSelector(selectSelf, (oneTaskState) =>
  oneTaskState.data.roles
    .map((el) => ({
      id: el.assign_user.user_id,
      isAuthor: el.task_role.is_author,
      roleName: el.task_role.name,
      name: el.assign_user.name,
      logo: el.assign_user.logo,
    }))
    .some(
      ({ roleName, id }) => roleName === 'Наблюдатель' && id === Helpers.Cookies.getUserIdCookies(),
    ),
);
export const currentUserIsExecutorSelector = createSelector(selectSelf, (oneTaskState) =>
  oneTaskState.data.roles
    .map((el) => ({
      id: el.assign_user.user_id,
      isAuthor: el.task_role.is_author,
      roleName: el.task_role.name,
      name: el.assign_user.name,
      logo: el.assign_user.logo,
    }))
    .some(
      ({ roleName, id }) =>
        roleName === 'Ответственный' && id === Helpers.Cookies.getUserIdCookies(),
    ),
);
export const currentUserIsUnknownSelector = createSelector(
  selectSelf,
  (oneTaskState) =>
    !oneTaskState.data.roles
      .map((el) => ({
        id: el.assign_user.user_id,
        isAuthor: el.task_role.is_author,
        roleName: el.task_role.name,
        name: el.assign_user.name,
        logo: el.assign_user.logo,
      }))
      .some(({ id }) => id === Helpers.Cookies.getUserIdCookies()),
);

export const userObserverSelector = createSelector(selectSelf, (oneTaskState) =>
  oneTaskState.data.roles
    .map((el) => ({
      id: el.assign_user.user_id,
      isAuthor: el.task_role.is_author,
      roleName: el.task_role.name,
      name: el.assign_user.name,
      logo: el.assign_user.logo,
    }))
    .filter(({ roleName }) => roleName === 'Наблюдатель'),
);

export const userResponsibleSelector = createSelector(selectSelf, (oneTaskState) =>
  oneTaskState.data.roles
    .map((el) => ({
      id: el.assign_user.user_id,
      isAuthor: el.task_role.is_author,
      roleName: el.task_role.name,
      name: el.assign_user.name,
      logo: el.assign_user.logo,
    }))
    .filter(({ roleName }) => roleName === 'Ответственный'),
);

export const userExecutorSelector = createSelector(selectSelf, (oneTaskState) =>
  oneTaskState.data.roles
    .map((el) => ({
      id: el.assign_user.user_id,
      isAuthor: el.task_role.is_author,
      roleName: el.task_role.name,
      name: el.assign_user.name,
      logo: el.assign_user.logo,
    }))
    .filter(({ roleName }) => roleName === 'Исполнитель'),
);
export const oneTaskCurrentTaskIdSelector = createSelector(
  selectSelf,
  (oneTaskState) => oneTaskState.currentTaskId,
);

export const oneTaskCheckListStatusSelector = createSelector(
  selectSelf,
  (oneTaskState) => oneTaskState.checkListStatus,
);

export const oneTaskTagStatusSelector = createSelector(
  selectSelf,
  (oneTaskState) => oneTaskState.tagStatus,
);

export const TaskStatusID = createSelector(selectSelf, (s) => s.data.status.task_status_id);
