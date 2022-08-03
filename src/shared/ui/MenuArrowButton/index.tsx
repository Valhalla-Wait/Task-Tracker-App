import React from 'react';
import { Icons } from 'shared';
import styled, { css } from 'styled-components';

const { ArrowButtonIcon } = Icons;

export const MenuArrowButton = ({ isActive, isActiveModal }: any) => (
  <Wrap isActiveModal={isActiveModal} isActive={isActive}>
    <ArrowButtonIcon />
  </Wrap>
);

const Wrap = styled.div`
  ${(props: { isActiveModal?: boolean; isActive?: boolean }) => {
    if (props.isActive) {
      return css`
         {
          transform: rotate(180deg);
          transition-duration: 0.3s;
        }
      `;
    }
    if (props.isActiveModal) {
      return css`
         {
          transform: rotate(-90deg);
          transition-duration: 0.3s;
        }
      `;
    }
    return css`
       {
        transform: rotate(0deg);
        transition-duration: 0.3s;
      }
    `;
  }}
`;
