import React from 'react';
import { Spin as SpinAntd } from 'antd';
import styled from 'styled-components';

export const SpinLoading = () => (
  <SpinWrapper>
    <Spin size="large" />
  </SpinWrapper>
);

const SpinWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0);
`;

const Spin = styled(SpinAntd)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
