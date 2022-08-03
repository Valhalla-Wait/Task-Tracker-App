import React from 'react';
import { useSelector } from 'react-redux';
import { HistorySelectors } from 'store';
import styled from 'styled-components';
import { Icons } from 'shared';
import { DetailSideBarOneTask } from '../../SideBar';
import { ActionsItem } from './ActionsItem';

const { ActionsModalIcon } = Icons;

export const Actions = () => {
  const history = useSelector(HistorySelectors.historySelector);
  return (
    <Wrap>
      <SideBar>
        <DetailSideBarOneTask />
      </SideBar>

      <ActionsWrap>
        <Icon>
          <ActionsModalIcon />
        </Icon>

        <ActionsBlock>
          <Header>Действия</Header>

          <ActionsItems>
            {history.map((el) => (
              <ActionsItem action={el} />
            ))}
          </ActionsItems>
        </ActionsBlock>
      </ActionsWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideBar = styled.div`
  display: none;

  @media (max-width: 939px) {
    display: block;
    margin-left: 30px;
    background-color: #fff !important;
  }
`;

const ActionsWrap = styled.div`
  display: flex;
  margin: 25px 0 10px;
  align-items: flex-start;
`;

const Icon = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 30px;
  margin-right: 16px;
  align-items: center;
  justify-content: center;
`;

const ActionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 16px;
  font: var(--h5-16_24-medium);
`;

const ActionsItems = styled.div`
  max-height: 300px;
  padding-right: 3px;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-mainblue-default);
    border-radius: 4px;
    box-shadow: inset 0 0 5px var(--color-blue);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #253861;
  }
`;
