import React from 'react';
import { useDispatch } from 'react-redux';
import { FilterActions } from 'store';
import styled from 'styled-components';
import { Button } from '../../Button';

export const ClearButton = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(FilterActions.resetFilters());
  };

  return (
    <Wrap type="default" size="middle" onClick={clickHandler}>
      Очистить фильтры
    </Wrap>
  );
};

const Wrap = styled(Button)`
  width: 100%;
`;
