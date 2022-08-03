import React from 'react';
import { useSelector } from 'react-redux';
import { OneTaskSelectors } from 'store';
import styled from 'styled-components';
import { CheckList } from './CheckList';
import { Actions } from './Actions';
import { Attachment } from './Attachment';
import { Description } from './Description';
import { Header } from './Header';

export const DetailContentOneTask = () => {
  const item = useSelector(OneTaskSelectors.oneTaskSelector);
  return (
    <Wrap>
      <Header
        title={item.title}
        isCheckList={!!item.check_lists.length}
        taskID={item.task_id}
        attachmentsFilesMaxCount={item.storage_files.length >= 15}
      />
      <Description description={item.description} taskID={item.task_id} />
      {item.check_lists.length ? (
        <CheckList checkList={item.check_lists[0]} progress={item.progress} taskID={item.task_id} />
      ) : null}
      <Attachment taskId={item.task_id} files={item.storage_files} />
      <Actions />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;
  width: calc(100% - 48px);
`;
