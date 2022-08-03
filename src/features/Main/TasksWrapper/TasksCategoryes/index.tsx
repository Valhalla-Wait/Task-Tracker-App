import { List } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Icons } from 'shared';
import {
  AtWorkListSelectors,
  CompletedListSelectors,
  FilterSelectors,
  IncomingListSelectors,
  NotCompletedListSelectors,
  RejectedListSelectors,
  StatusesTypes,
} from 'store';
import { AtWorkList } from './AtWorkList';
import { CompletedList } from './CompletedList';
import { IncomingList } from './IncomingList';
import { NotCompletedList } from './NotCompletedList';
import { RejectedList } from './RejectedList';

const { EmptyIcon } = Icons;

export const TasksCategoryesComponent = () => {
  const IncomingItemsTotal = useSelector(IncomingListSelectors.itemsTotal);
  const AtWorkItemsTotal = useSelector(AtWorkListSelectors.itemsTotal);
  const CompletedItemsTotal = useSelector(CompletedListSelectors.itemsTotal);
  const NotCompletedItemsTotal = useSelector(NotCompletedListSelectors.itemsTotal);
  const RejectedItemsTotal = useSelector(RejectedListSelectors.itemsTotal);

  const statuses = useSelector(FilterSelectors.statuses);

  const data = [] as React.ReactElement[];

  if (IncomingItemsTotal && statuses?.includes(StatusesTypes.statusesId.created)) {
    data.push(<IncomingList />);
  }
  if (AtWorkItemsTotal && statuses?.includes(StatusesTypes.statusesId.inWork)) {
    data.push(<AtWorkList />);
  }
  if (CompletedItemsTotal && statuses?.includes(StatusesTypes.statusesId.completed)) {
    data.push(<CompletedList />);
  }
  if (NotCompletedItemsTotal && statuses?.includes(StatusesTypes.statusesId.notCompleted)) {
    data.push(<NotCompletedList />);
  }
  if (RejectedItemsTotal && statuses?.includes(StatusesTypes.statusesId.rejected)) {
    data.push(<RejectedList />);
  }

  return (
    <List
      dataSource={data}
      locale={{
        emptyText: (
          <div className="ant-empty ant-empty-normal">
            <div className="ant-empty-image">
              <EmptyIcon />
            </div>
            <div className="ant-empty-description">Нет задач</div>
          </div>
        ),
      }}
      renderItem={(item) => item}
    />
  );
};
