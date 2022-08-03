import React from 'react';
import styled from 'styled-components';
import { ProfileComponent } from '../ProfileComponent';
import { AddTask } from './AddTask';

export const Header = () => (
  <Wrap>
    <Title>
      <h1>Задачи</h1>
    </Title>
    <Profile>
      <ProfileComponent />
    </Profile>

    <AddTask />
  </Wrap>
);

const Wrap = styled.div`
  display: grid;
  grid-template-areas: 'title profile' 'add add';
`;

const Title = styled.div`
  display: grid;
  grid-area: title;
  justify-content: space-between;
  align-items: center;

  h1 {
    font: var(--h1-32_40-bold);
    color: var(--color-grey800);
    margin: 6px 0 0;
    @media (max-width: 645px) {
      font: var(--h2-24_32-medium);
    }
  }
`;

const Profile = styled.div`
  display: grid;
  grid-area: profile;
  @media (max-width: 645px) {
    display: none;
  }
`;
