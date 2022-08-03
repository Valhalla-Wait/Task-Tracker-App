import React, { useEffect, useState } from 'react';
import { Input as InputAntd } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from 'shared';
import { FilterActions, FilterSelectors } from 'store';
import styled from 'styled-components';

const { SearchIcon } = Icons;

export const Finder = () => {
  const dispatch = useDispatch();
  const searchString = useSelector(FilterSelectors.searchString) ?? '';

  const [currentSearch, setCurrentSearch] = useState(searchString);
  const [debouncedSearch, setDebouncedSearch] = useState(currentSearch);

  useEffect(() => {
    setCurrentSearch(searchString);
  }, [searchString]);

  useEffect(() => {
    const timerID = setTimeout(() => {
      setDebouncedSearch(currentSearch);
    }, 1000);

    return () => {
      clearTimeout(timerID);
    };
  }, [currentSearch]);

  useEffect(() => {
    if (debouncedSearch) dispatch(FilterActions.setSearch(debouncedSearch));
    else dispatch(FilterActions.removeSearch());
  }, [debouncedSearch]);

  return (
    <Input
      prefix={<SearchIcon size={16} />}
      value={currentSearch}
      onChange={(e) => setCurrentSearch(e.target.value)}
    />
  );
};

const Input = styled(InputAntd)`
  border-radius: 8px;
  height: 38px;
  border: 1px solid var(--color-grey300);
  background: var(--color-grey100);
  margin-bottom: 40px;
  font: var(--paragraph-14_24-regular);
  .ant-input {
    background: var(--color-grey100);
  }
  .ant-input-prefix {
    margin: 0 14px 0 2px;
  }
`;
