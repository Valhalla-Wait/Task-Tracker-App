import { Popover, Skeleton, Spin } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { subscribesSelectors } from 'store';
import styled from 'styled-components';
import { SubcribeHeader } from './SubcribeHeader';
import s from './index.module.css';
import { Subscribes } from './Subscribes';
import { NotificationButton } from './NotificationButtons';

export const SubcribeHeaderPopover = () => {
  const [countSubscrib, setCountSubscrib] = useState('all');
  const [visiblePopoverSubc, setVisiblePopoverSubc] = useState(false);

  const item = useSelector(subscribesSelectors.subscribesSelector);
  const subcribeVisiblePopover = () => setVisiblePopoverSubc(!visiblePopoverSubc);

  const status = useSelector(subscribesSelectors.subscribesStatusSelector);

  const visibleRedCircle = () => item?.filter((el) => el.viewed === false).length > 0;

  return (
    <Spin spinning={status === 'loading'}>
      <Popover
        overlayClassName={s.profile_side_wrapper_popover}
        visible={visiblePopoverSubc}
        onVisibleChange={subcribeVisiblePopover}
        title={
          <Skeleton paragraph={{ rows: 0 }} loading={status === 'loading'}>
            <WrapSubcribesNoRite>
              <SubcribeHeader
                setActiveVisible={subcribeVisiblePopover}
                countSubscrib={countSubscrib}
                setCountSubscrib={setCountSubscrib}
              />
            </WrapSubcribesNoRite>
          </Skeleton>
        }
        placement="bottomRight"
        content={
          <Subscribes countSubscrib={countSubscrib} setActiveVisible={subcribeVisiblePopover} />
        }
        trigger="click"
      >
        <button type="button">
          <NotificationButton notification={visibleRedCircle()} />
        </button>
      </Popover>
    </Spin>
  );
};
const WrapSubcribesNoRite = styled.div`
  .subcribes_no_rite_count {
    display: inline-block;
    font: var(--paragraph-14_24-light);
    color: var(--color-grey600);
    margin: 0px 10px 0px 22px;
  }
  .subcribes_no_rite {
    font: var(--h6-12_16-medium);
    display: inline-block;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-grey0);
    background: #1890ff;
    border-radius: 50%;
  }
  .subcribes_no_rite_box {
    margin: 14px 0px 0px 0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .subcribes_no_rite_btn {
    display: none;
  }
  @media (max-width: 645px) {
    .subcribes_no_rite_btn {
      display: inline-block;
      background: none;
      border: none;
      padding: 0px;
      margin-right: 10px;
      flex-grow: 1;
      text-align: end;
      cursor: pointer;
    }

    .subcribes_no_rite_wrap {
      position: fixed;
      left: 0;
      top: 0;
      width: 100% !important;
      height: 110px;
      background: #fff;
      z-index: 1000000 !important;
      border-bottom: 1px solid #f0f0f0;
    }
  }
`;
