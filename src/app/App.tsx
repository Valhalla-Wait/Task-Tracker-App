import React, { useEffect } from 'react';
import { AuthPage, MainPage } from 'pages';
import { Route, Routes } from 'react-router-dom';
import { Helpers } from 'shared';
import { useDispatch } from 'react-redux';
import { AuthActions } from 'store';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Helpers.Cookies.getTokenCookies();
    if (token) dispatch(AuthActions.setToken(token));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
