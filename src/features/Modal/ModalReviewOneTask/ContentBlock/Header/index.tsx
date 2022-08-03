import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { OneTaskSelectors } from 'store';
import { Title } from './Title';
import { MenuButtons } from './MenuButtons';

type HeaderProps = {
  title: string;
  isCheckList: boolean;
  taskID: string;
  attachmentsFilesMaxCount: boolean;
};

export const Header: React.FC<HeaderProps> = (props) => {
  const { title, isCheckList, taskID, attachmentsFilesMaxCount } = props;
  const checkExecutorRole = useSelector(OneTaskSelectors.currentUserIsExecutorSelector);
  const checkAuthorRole = useSelector(OneTaskSelectors.currentUserIsAuthorSelector);

  return (
    <HeaderModal>
      <Title title={title} taskID={taskID} />

      {(checkExecutorRole || checkAuthorRole) && (
        <MenuButtons
          isCheckList={isCheckList}
          taskID={taskID}
          attachmentsFilesMaxCount={attachmentsFilesMaxCount}
        />
      )}
    </HeaderModal>
  );
};

const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  font: var(--h2-24_32-medium);
  border-bottom: 1px solid var(--color-grey300);

  @media (max-width: 939px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    margin-top: 10px;
  }
`;
