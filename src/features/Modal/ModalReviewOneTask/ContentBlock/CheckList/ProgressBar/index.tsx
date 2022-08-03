import { Progress } from 'antd';
import React from 'react';
import styled from 'styled-components';

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const { progress } = props;

  return (
    <Wrap>
      <Percent>
        {progress}
        %
      </Percent>

      <Progress
        percent={progress}
        showInfo={false}
        trailColor="var(--color-grey300)"
        strokeColor="var(--color-success-default)"
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  margin: 8px 0;
  padding: 0;
  align-items: center;
`;

const Percent = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 30px;
  margin-right: 16px;
  font: var(--paragraph-14_16-regular);
  color: var(--color-grey700);
`;
