type userInfoType = {
  id: string;
  isAuthor: boolean;
  roleName: string;
  name: string;
  logo: string;
};

export const messagePopoverObserver = (
  num: string,
  userObserver: userInfoType[],
  userResponsible: userInfoType[],
  userAuthor: userInfoType[],
) => {
  if (userObserver.map((el) => el.id).includes(num)) {
    return 'Пользователь уже является наблюдателем';
  }
  if (userResponsible.map((el) => el.id).includes(num)) {
    return 'Пользователь уже является ответственным';
  }
  if (userAuthor.map((el) => el.id).includes(num)) {
    return 'Этот пользователь является автором задачи';
  }
  return null;
};

export const messagePopoverResponsible = (
  num: string,
  userObserver: userInfoType[],
  userResponsible: userInfoType[],
  userAuthor: userInfoType[],
) => {
  if (userObserver.map((el) => el.id).includes(num)) {
    return 'Пользователь уже является наблюдателем';
  }
  if (userResponsible.map((el) => el.id).includes(num)) {
    return 'Пользователь уже является ответственным';
  }
  if (userAuthor.map((el) => el.id).includes(num)) {
    return 'Это пользователь является автором задачи';
  }
  if (userResponsible.length) {
    return 'Нельзя добавить больше одного ответственного';
  }
  return null;
};
