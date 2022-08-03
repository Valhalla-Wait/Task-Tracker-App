import React from 'react';
import { Types } from 'store';
import styled from 'styled-components';
import { SortSelect } from './SortSelect';

export const HeaderCard = (props: Types.SortOptionsType) => {
  const { title } = props;
  return (
    <BoxTitle>
      <div className="header_title">
        {title}
      </div>
      <div className="header_sort_title">Упорядочить по:</div>
      <div className="header_sort">
        <SortSelect {...props} />
      </div>
    </BoxTitle>
  );
};

const BoxTitle = styled.div`
  display: flex;
  gap: 10px;
  .header_title {
    flex-grow: 1;
    font: var(--h4-18_24-medium);
    color: var(--color-grey600);
  }
  .header_sort_title {
    font: var(--paragraph-14_24-light);
    color: var(--color-grey600);
    @media (max-width: 757px) {
      display: none;
    }
  }
  .header_sort {
    font: var(--paragraph-14_24-semibold);
    color: var(--color-grey800);
  }
`;
