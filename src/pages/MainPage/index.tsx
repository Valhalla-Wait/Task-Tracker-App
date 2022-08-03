import React from 'react';
import { Main } from 'features/Main';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthSelectors } from 'store';

export const MainPage = () => {
  const token = useSelector(AuthSelectors.authTokenSelector);

  return token ? <Main /> : <Navigate to="/auth" />;
};
