import React from 'react';
import { Button, Modal as ModalAntd } from 'antd';
import styled from 'styled-components';
import { CloseIcon } from 'shared/icon';
import { useDispatch, useSelector } from 'react-redux';
import { OneTaskActions, OneTaskEffects, OneTaskSelectors } from 'store';

export const ErrorModalOneTask = () => {
  const currentId = useSelector(OneTaskSelectors.oneTaskCurrentTaskIdSelector);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(OneTaskActions.resetOneTask());
  };

  const refetchTask = () => {
    dispatch(OneTaskEffects.fetchOneTask(currentId));
  };

  return (
    <Modal
      visible
      centered
      width="100%"
      closeIcon={<CloseIcon />}
      okText="Повторить"
      cancelText="Отмена"
      onCancel={closeModal}
      onOk={refetchTask}
    >
      <h1>Ошибка при загрузке</h1>
    </Modal>
  );
};

const Modal = styled(ModalAntd)`
  max-width: 500px;

  .ant-modal-content {
    border-radius: 16px;
    margin: 10px;
  }
  .ant-modal-footer {
    border: none;
  }
  .ant-btn {
    border-radius: 8px;
  }
  .ant-btn-default {
    font: var(--h6-12_16-medium);
    color: var(--color-grey700);
  }
`;
