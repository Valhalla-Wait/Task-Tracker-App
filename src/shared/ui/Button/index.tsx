import React from 'react';
import { Button as ButtonAntd, ButtonProps } from 'antd';
import styled from 'styled-components';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <ButtonWrapper {...props}>
    {children}
  </ButtonWrapper>
);

const ButtonWrapper = styled(ButtonAntd)`
  ${(props) => {
    switch (props.size) {
      case 'small':
        return `
          height: 32px;
          min-height: 32px;
          font: var(--h6-12_16-bold);
          `;
      case 'middle':
        return `
          height: 40px;
          min-height: 40px;
          font: var(--paragraph-14_24-semibold);
        `;
      case 'large':
        return `
          height: 48px;
          min-height: 48px;
          font: var(--paragraph-14_24-semibold);
        `;
      default:
        return `
          height: 48px;
          min-height: 48px;
          font: var(--paragraph-14_24-semibold);
        `;
    }
  }}
  ${(props) => {
    switch (props.type) {
      case 'primary':
        return `
          background: var(--color-mainblue-default);
          color: var(--color-grey0);
          `;
      case 'dashed':
        return `
          background: var(--color-grey0);
          color: var(--color-grey900);
          border-style: dashed;
        `;
      case 'text':
        return `
          background: var(--color-grey0);
          color: var(--color-grey900);
        `;
      case 'link':
        return `
          background: var(--color-grey0);
          color: var(--color-mainblue-default);
        `;
      case 'default':
      default:
        return `
          background: var(--color-grey0);
          color: var(--color-grey700);
          border: 1px solid var(--color-grey400) !important;
        `;
    }
  }}
  
  border-radius: 8px;
  width: 100%;
`;
