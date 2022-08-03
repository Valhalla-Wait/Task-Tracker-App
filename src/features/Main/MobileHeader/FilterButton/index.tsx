/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Icons, Filters, Button } from 'shared';
import { useDispatch, useSelector } from 'react-redux';
import { FilterActions, FilterSelectors, FilterTypes } from 'store';
import { Modal } from 'antd';

const { AssignToMe, Attachment, ClearButton, Finder, Members, Priority, Status, Tags } = Filters;

const { FilterIcon } = Icons;

export const FilterButton = () => {
  const filtersCount = useSelector(FilterSelectors.activeFiltersCount);
  const allFilters = useSelector(FilterSelectors.allFilters);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterBackUp, setFilterBackUp] = useState<FilterTypes.FilterReducerType>(
    {} as FilterTypes.FilterReducerType,
  );

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
    setFilterBackUp(allFilters);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    dispatch(FilterActions.setAllFilters(filterBackUp));
    setIsModalVisible(false);
  };

  return (
    <>
      <FButton fillBackground={!!filtersCount} onClick={showModal}>
        <FilterIcon />
        {filtersCount ? <div className="filtersCount">{filtersCount}</div> : null}
      </FButton>
      <ModalWrap
        visible={isModalVisible}
        onCancel={handleCancel}
        width="300px"
        style={ModalStyle}
        footer={
          <Button type="primary" onClick={handleOk} size="middle" style={{ width: '100%' }}>
            Показать задачи
          </Button>
        }
      >
        <AssignToMe />
        <Finder />
        <Members />
        <Status />
        <Tags />
        <Attachment />
        <Priority />
        <ClearButton />
      </ModalWrap>
    </>
  );
};

const FButton = styled.button<{
  fillBackground: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  background-color: ${(p) => (p.fillBackground ? 'var(--color-grey200) !important' : 'none')};
  border: 1px solid var(--color-grey300) !important;
  border-radius: 8px;
  .filtersCount {
    width: 20px;
    height: 20px;
    margin: 6px 6px 6px 0;
    border-radius: 50%;
    background: var(--color-mainblue-default);
    color: var(--color-grey0);
    font: var(--h6-12_16-bold);
    text-align: center;
    padding-top: 2px;
    padding-right: 1px;
  }
`;

const ModalWrap = styled(Modal)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  box-sizing: border-box;
  padding: 40px 16px;
  min-width: 300px;
  border-right: 1px solid var(--color-grey300);
  align-items: center;
  justify-content: flex-start;

  .ant-modal-content {
    height: 100%;
    width: 100%;
    padding: 40px 10px 10px 10px;
  }

  .ant-modal-body {
    height: calc(100% - 60px);
    width: 100%;
    padding: 24px 10px 10px;
    overflow: auto;
  }

  .ant-modal-footer {
    border: none;
    padding: 10px;
  }
`;

const ModalStyle: React.CSSProperties = {
  display: 'flex',
  top: 0,
  left: 'calc(50% - 160px)',
  margin: 10,
  padding: 0,
  border: 'none',
  maxWidth: 'calc(100vw - 20px)',
  boxSizing: 'border-box',
  height: 'calc(100% - 20px)',
  overflow: 'hidden',
  color: 'blue',
};
