import React from 'react';
import styled from 'styled-components';
import { PlusButton } from './PlusButton';
import { EyeButton } from './EyeButton';

type MenuButtonsProps = {
  isCheckList: boolean;
  taskID: string;
  attachmentsFilesMaxCount: boolean;
};

export const MenuButtons: React.FC<MenuButtonsProps> = (props) => {
  const { isCheckList, taskID, attachmentsFilesMaxCount } = props;

  return (
    <Wrap>
      <PlusButton
        isCheckList={isCheckList}
        taskID={taskID}
        attachmentsFilesMaxCount={attachmentsFilesMaxCount}
      />
      <EyeButton taskID={taskID} />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  .modal_header_subscribes {
    margin: 0px;
    padding: 0px;
    border: none;
    background: none;
    cursor: pointer;
  }
`;
