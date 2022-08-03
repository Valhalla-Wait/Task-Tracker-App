import React from 'react';
import styled from 'styled-components';

type CounterArgsType = {
  count: number;
  maxLength?: number | undefined;
};

export const Counter = (args: CounterArgsType) => {
  const { count, maxLength } = args;

  return (
    <Count>
      {count}
      /
      {maxLength}
    </Count>
  );
};

const Count = styled.div`
  font: var(--mini-10_16-regular);
  color: var(--color-grey900);
`;
