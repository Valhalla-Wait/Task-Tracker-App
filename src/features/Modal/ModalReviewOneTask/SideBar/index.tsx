import React from 'react';
import { useSelector } from 'react-redux';
import { OneTaskSelectors } from 'store';
import { DetailBlock } from './DetailBlock';
import { MembersBlock } from './MembersBlock';

export const DetailSideBarOneTask = () => {
  const item = useSelector(OneTaskSelectors.oneTaskSelector);

  return (
    <>
      <DetailBlock />
      <MembersBlock taskId={item.task_id} />
    </>
  );
};
