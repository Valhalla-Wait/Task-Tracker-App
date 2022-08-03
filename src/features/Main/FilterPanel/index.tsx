import React from 'react';
import styled from 'styled-components';
import { Filters } from 'shared';

const { AssignToMe, Attachment, ClearButton, Finder, Members, Priority, Status, Tags } = Filters;

export const FilterPanel = () => (
  <Wrap>
    <AssignToMe />
    <Finder />
    <Members />
    <Status />
    <Tags />
    <Attachment />
    <Priority />
    <ClearButton />
  </Wrap>
);

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 40px 16px;
  min-height: 100vh;
  background: var(--color-grey0);
  border-right: 1px solid var(--color-grey300);
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
  @media (max-width: 645px) {
    display: none;
  }
`;
