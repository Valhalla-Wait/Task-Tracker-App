type userInfoType = {
  id: string;
  isAuthor: boolean;
  roleName: string;
  name: string;
  logo: string;
};
export const isDisabledExecutor = (
  num: string,
  userExe: userInfoType[],
  userInf: userInfoType[],
) => {
  const userInfoId: string[] = [];
  for (let i = 0; i < userInf.length; i += 1) {
    userInfoId.push(userInf[i].id);
  }

  if (userInfoId.includes(num)) {
    return true;
  }
  if (userExe.length) {
    return true;
  }
  return false;
};

export const isDisabledResponsible = (
  num: string,
  userResp: userInfoType[],
  userInf: userInfoType[],
) => {
  const userInfoId: string[] = [];
  for (let i = 0; i < userInf.length; i += 1) {
    userInfoId.push(userInf[i].id);
  }

  if (userInfoId.includes(num)) {
    return true;
  }
  if (userResp.length) {
    return true;
  }
  return false;
};

export const isDisabledObserver = (num: string, userInf: userInfoType[]) => {
  const userInfoId: string[] = [];
  for (let i = 0; i < userInf.length; i += 1) {
    userInfoId.push(userInf[i].id);
  }

  if (userInfoId.includes(num)) {
    return true;
  }
  return false;
};
