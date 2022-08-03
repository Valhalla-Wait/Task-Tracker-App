/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Skeleton } from 'antd';

import { useSelector } from 'react-redux';
import { subscribesSelectors } from 'store';
import styled from 'styled-components';
import { SubscribesItem } from './SubscribesItem';

type SubscribesProps = {
  countSubscrib: string;
  setActiveVisible: () => void;
};

export const Subscribes: React.FC<SubscribesProps> = (props) => {
  const { countSubscrib, setActiveVisible } = props;
  const item = useSelector(subscribesSelectors.subscribesSelector);
  const item2 = useSelector(subscribesSelectors.subscribesSelectorTrue);
  const item3 = useSelector(subscribesSelectors.subscribesSelectorFalse);
  const status = useSelector(subscribesSelectors.subscribesStatusSelector);
  return (
    <Wrap>
      <Skeleton loading={status === 'loading'}>
        <div>
          {countSubscrib === 'all' && (
            <SubscribesItem setActiveVisible={setActiveVisible} item={item} />
          )}
          {countSubscrib === 'read' && (
            <SubscribesItem setActiveVisible={setActiveVisible} item={item2} />
          )}
          {countSubscrib === 'noread' && (
            <SubscribesItem setActiveVisible={setActiveVisible} item={item3} />
          )}
        </div>
      </Skeleton>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: 102vh;
  height: 100%;
  overflow-x: hidden;
  margin-top: 70px;
  overflow-y: scroll;

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
  @media (min-width: 645px) {
    width: 340px;
    max-height: 450px;
    min-height: auto;
    height: auto;
    margin-top: 0px;
  }

  .subscribes_user_wrap {
    display: flex;
    gap: 5px;
  }
  .subscribes_user_name {
    color: var(--color-grey900);
    font: var(--paragraph-14_20-semibold);
    display: inline-block;
    white-space: nowrap;
    max-width: 163px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .subscribes_action_name {
    font: var(--paragraph-14_24-light);
    color: var(--color-mainblue-default);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .subscribes_wrap {
    padding: 8px;
    border: 1px solid var(--color-grey300);
    border-radius: 16px;
    margin: 10px 0px;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }
  .subscribes_tag_wrap {
    display: inline-block;
  }
  .subscribes_check_list_item_box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    font: var(--h5-16_24-regular);
    color: var(--color-grey900);
  }
  .subscribes_check_list_item {
    text-decoration: line-through;
  }
  .subscribes_item {
    font: var(--paragraph-14_24-light);
    color: var(--color-grey600);
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &_noread {
      @media (max-width: 645px) {
        font-size: 23px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50vh;
      }
    }
  }
  .subscribes_data_created {
    color: var(--color-grey600);
    font: var(--h6-12_16-medium);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    text-align: right;
  }
  .subscribes_user_data_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
