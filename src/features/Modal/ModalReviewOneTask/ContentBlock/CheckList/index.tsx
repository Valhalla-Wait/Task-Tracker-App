import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { OneTaskSelectors, Types } from 'store';
import styled from 'styled-components';
import { AddItem } from './AddItem';
import { CheckItems } from './CheckItems';
import { Header } from './Header';
import { ProgressBar } from './ProgressBar';

type CheckListProps = {
  checkList: Types.TaskCheckListType;
  progress: Types.TaskProgressType | null;
  taskID: string;
};

export const CheckList: React.FC<CheckListProps> = (props) => {
  const { checkList, progress, taskID } = props;
  const status = useSelector(OneTaskSelectors.oneTaskCheckListStatusSelector);

  return (
    <Wrap spinning={status === 'loading'}>
      <Header
        title={checkList.title}
        checkListID={checkList.check_list_id}
        taskID={taskID}
        isEmpty={!checkList.items?.length}
      />

      {progress && <ProgressBar progress={progress.percent} />}

      {checkList.items && (
        <CheckItems checkListID={checkList.check_list_id} items={checkList.items} />
      )}

      <AddItem checkListID={checkList.check_list_id} />
    </Wrap>
  );
};

const Wrap = styled(Spin)`
  overflow: hidden;
  width: 100%;
  max-height: none !important;
`;
