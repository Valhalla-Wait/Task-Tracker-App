import React from 'react';
import { Progress as ProgressAntd } from 'antd';
import styled from 'styled-components';

type ProgressPropsType = {
  progressPercent: number;
};

export const ProgressBar = (progressProps: ProgressPropsType) => {
  const { progressPercent } = progressProps;

  return (
    <div style={{ width: 170 }}>
      <ProgressTask
        percent={progressPercent}
        size="small"
        strokeColor="#3DD598"
        trailColor="#E2E2EA"
      />
    </div>
  );
};

const ProgressTask = styled(ProgressAntd)`
  border-radius: 2.5px;
`;
