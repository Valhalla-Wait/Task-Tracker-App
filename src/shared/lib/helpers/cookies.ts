import Cookies from 'universal-cookie';

export const setTokenCookies = (token: string) => {
  const cookies = new Cookies();
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  cookies.set('token', token, {
    path: '/',
    expires,
  });
};

export const removeTokenCookies = () => {
  const cookies = new Cookies();
  cookies.remove('token', { path: '/' });
};

export const getTokenCookies = () => {
  const cookies = new Cookies();
  return cookies.get('token');
};

export const getUserIdCookies = () => {
  const cookies = new Cookies();
  return cookies.get('user_id');
};
