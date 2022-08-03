import React from 'react';
import { Auth } from 'features';
import { useSelector } from 'react-redux';
import { AuthSelectors } from 'store';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

export const AuthPage = () => {
  const token = useSelector(AuthSelectors.authTokenSelector);

  if (token) return <Navigate to="/" />;
  return (
    <Wrapper>
      <Auth />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--color-grey300);
  align-items: center;
  justify-content: center;
`;
