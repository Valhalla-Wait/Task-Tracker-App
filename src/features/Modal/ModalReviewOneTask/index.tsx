import React from 'react';
import { Modal as ModalAntd } from 'antd';
import styled from 'styled-components';
import { CloseIcon } from 'shared/icon';
import { useDispatch, useSelector } from 'react-redux';
import {
  AtWorkListEffects,
  CompletedListEffects,
  IncomingListEffects,
  NotCompletedListEffects,
  OneTaskActions,
  OneTaskSelectors,
  RejectedListEffects,
  StatusesTypes,
} from 'store';
import { DetailContentOneTask } from './ContentBlock';
import { DetailSideBarOneTask } from './SideBar';

export const ModalReviewOneTask = () => {
  const dispatch = useDispatch();

  const currentTaskStatus = useSelector(OneTaskSelectors.TaskStatusID);

  const closeModal = () => {
    switch (currentTaskStatus) {
      case StatusesTypes.statusesId.created:
        dispatch(IncomingListEffects.fetchAll({}));
        break;
      case StatusesTypes.statusesId.inWork:
        dispatch(AtWorkListEffects.fetchAll({}));
        break;
      case StatusesTypes.statusesId.notCompleted:
        dispatch(NotCompletedListEffects.fetchAll({}));
        break;
      case StatusesTypes.statusesId.rejected:
        dispatch(RejectedListEffects.fetchAll({}));
        break;
      case StatusesTypes.statusesId.completed:
        dispatch(CompletedListEffects.fetchAll({}));
        break;
      default:
    }
    dispatch(OneTaskActions.resetOneTask());
  };

  return (
    <Modal centered visible closeIcon={<CloseIcon />} footer={null} onCancel={closeModal}>
      <WrapModal>
        <div className="col-1">
          <DetailContentOneTask />
        </div>
        <div className="col-2">
          <DetailSideBarOneTask />
        </div>
      </WrapModal>
    </Modal>
  );
};

const Modal = styled(ModalAntd)`
  .ant-modal-body {
    padding: 0px !important;
  }
  .ant-modal-header {
    display: none;
  }
  @media (min-width: 940px) {
    width: 75% !important;
  }
`;

const WrapModal = styled.div`
  width: 100% !important;
  display: grid;

  @media (min-width: 940px) {
    grid-template-columns: 60% 40%;

    .col-1 {
      background-color: var(--color-grey0);
      padding-top: 24px 24px;
      border-radius: 16px 0px 0px 16px;
    }
    .col-2 {
      background-color: var(--color-grey100);
      padding: 24px 24px;
      border-radius: 0px 16px 16px 0px;
    }
  }

  @media (max-width: 939px) {
    grid-template-columns: 100%;

    .col-2 {
      display: none;
    }
  }
`;
