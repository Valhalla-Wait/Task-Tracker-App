import React, { useRef } from 'react';
import { InputNumber as InputNumberAnt, InputNumberProps, List as ListAnt } from 'antd';
import styled from 'styled-components';
import { IncomingListEffects, IncomingListSelectors, StatusesTypes, Types } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderCard, Helpers, Hooks } from 'shared';
import { ContentCard } from './ContentCard';

const { useDebounce } = Hooks;
const { createShowTotal } = Helpers;
const { Item } = ListAnt;

export const IncomingList = () => {
  const {
    per_page: pageSize,
    items_total: itemsTotal,
    page_current: pageCurrent,
  } = useSelector(IncomingListSelectors.pagination);
  const ref = useRef<HTMLDivElement>(null);

  const listData = useSelector(IncomingListSelectors.data);
  const status = useSelector(IncomingListSelectors.status);
  const sort = useSelector(IncomingListSelectors.sort);

  const dispatch = useDispatch();

  const changePageSize = (size: number) => {
    dispatch(IncomingListEffects.fetchAll({ per_page: size, page: 1 }));
    ref.current?.scrollIntoView();
  };
  return (
    <BoxWrap ref={ref}>
      <InboxWrap>
        <List
          header={
            <HeaderCard
              title={Types.TitlesCards.incoming}
              taskStatus={StatusesTypes.statusesId.created}
              listSort={sort}
            />
          }
          dataSource={status === 'fail' ? undefined : listData}
          loading={status === 'loading'}
          pagination={{
            responsive: true,
            showLessItems: true,
            showSizeChanger: false,
            showTotal: (total: number, range: number[]) => createShowTotal(total, range, status),
            pageSize,
            onChange: (page: number) => {
              ref.current?.scrollIntoView();
              dispatch(IncomingListEffects.fetchAll({ page }));
            },
            total: itemsTotal,
            current: pageCurrent,
          }}
          renderItem={(item: any) => (
            <Item key={item.task_id}>
              <ContentCard item={item} />
            </Item>
          )}
          footer={
            <InputNumber
              parser={(val?: string) => `${val}`.replace(/\D/g, '')}
              min={1}
              max={50}
              onChange={useDebounce((size) => changePageSize(size), 1000)}
              defaultValue={pageSize}
            />
          }
        />
      </InboxWrap>
    </BoxWrap>
  );
};

const BoxWrap = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const InboxWrap = styled.div`
  background-color: var(--color-grey100);
  border: 1px solid var(--color-grey200);
  border-radius: 16px;
  padding-bottom: 9px;
  padding: 9px;
`;

const List = styled(ListAnt)`
  display: grid;
  grid-template-columns: 1fr 70px;
  grid-template-areas:
    'header header'
    'content content'
    'pagination footer';

  @media (max-width: 780px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'header header'
      'content content'
      'pagination pagination';
  }

  .ant-list-header {
    grid-area: header;
  }
  .ant-spin-nested-loading {
    grid-area: content;
  }

  .ant-list-pagination {
    grid-area: pagination;
  }
  .ant-list-footer {
    grid-area: footer;
    padding-top: 0px;
    margin-left: 10px;
    justify-self: flex-end;
    @media (max-width: 780px) {
      display: none;
    }
  }
  .ant-pagination-total-text {
    @media (max-width: 715px) {
      display: none;
    }
  }
  .ant-spin-container > .ant-list-items > .ant-list-item:last-child {
    border-bottom: none !important;
  }
  .ant-list-item {
    display: block;
  }
  .ant-pagination-item-active {
    background: none;
  }
  .ant-pagination-item {
    border: none;
    background: none;
  }
  .ant-pagination-item-link,
  .ant-select-selector {
    border-radius: 8px !important;
  }
  .ant-pagination-total-text {
    color: var(--color-grey700);
  }
  .ant-list-pagination {
    margin-top: 0px;
  }
  @media (max-width: 560px) {
    .ant-list-pagination {
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }
  }
  .ant-list-header,
  .ant-list-item {
    border-bottom: none !important;
  }

  .ant-list-footer,
  .ant-list-header {
    padding-bottom: 0px !important;
  }
`;

const InputNumber = styled(InputNumberAnt)<InputNumberProps>`
  width: 58px;
  border-radius: 8px;
  .ant-input-number-handler-wrap {
    opacity: 1;
    border-radius: 8px;
  }
`;
