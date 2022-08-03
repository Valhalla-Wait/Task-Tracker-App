import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { SixDotsIcon } from '../../icon';

const { Paragraph } = Typography;

export const DescriptionTaskTitle = (props: any) => {
  const { taskTitle } = props;

  return (
    <Wrap>
      <span>
        <SixDotsIcon />
      </span>
      <Paragraph ellipsis={{ rows: 2 }}>
        {taskTitle}
      </Paragraph>
    </Wrap>
  );
};
const Wrap = styled.div`
  display: flex;
  align-items: center;
  max-width: 200px;

  font: var(--paragraph-14_20-semibold);
  color: var(--color-grey800);

  span {
    width: 24px;
    cursor: pointer;
  }

  .ant-typography p,
  div.ant-typography {
    margin-bottom: 0.2rem !important;
    text-align: left;
  }
`;
