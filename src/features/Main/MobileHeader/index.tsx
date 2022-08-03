import React from 'react';
import { useSelector } from 'react-redux';
import { FilterSelectors } from 'store';
import styled from 'styled-components';
import { ProfileComponent } from '../TasksWrapper/ProfileComponent';
import { FilterButton } from './FilterButton';

export const MobileHeader = () => (
  <Wrap>
    <FilterButton />
    <ProfileComponent />
  </Wrap>
);

const Wrap = styled.div`
  padding: 10px 11px 10px 16px;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-content: center;
  background: var(--color-grey0);
  @media (min-width: 645px) {
    display: none;
  }
`;
