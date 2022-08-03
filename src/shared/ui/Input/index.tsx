import React from 'react';
import { Input as InputAntd, InputProps } from 'antd';
import styled from 'styled-components';

export const Input = (props: InputProps) => <InputWrapper {...props} />;

const InputWrapper = styled(InputAntd)`
  height: ${(props) => {
    switch (props.size) {
      case 'large':
        return '48px';
      case 'middle':
        return '36px';
      case 'small':
        return '24px';
      default:
        return '48px';
    }
  }};
  background: var(--color-grey0);
  border: 1px solid var(--color-grey300);
  border-radius: 8px;
`;
