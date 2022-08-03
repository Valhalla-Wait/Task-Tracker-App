/* eslint-disable react/jsx-indent */
import React from 'react';
import styled from 'styled-components';
import { Tag as TagAntd, TagProps } from 'antd';

export const Tag: React.FC<TagProps & { mCollapsable?: boolean; mHidden?: boolean }> = ({
  children,
  ...props
}) => <TagWrapper {...props}>
{children}
      </TagWrapper>;

const TagWrapper = styled(TagAntd)<{ mCollapsable?: boolean; mHidden?: boolean }>`
  display: flex;
  height: 24px;
  font: var(--h6-12_16-medium);
  margin: 4px 2px;
  padding: 0 11px 0 11px;
  border: 1px solid;
  border-radius: 12px;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;

  ${(p) => {
    if (p.mCollapsable) {
      return `@media (max-width: 560px) {
    overflow: hidden;
    height: 4px;
    width: 70px;
    border: 2px solid;
    border-radius: none;
    pointer-events: none;
  }`;
    }
    return '';
  }}

  ${(p) => {
    if (p.mHidden) {
      return `@media (max-width: 560px) {
    display: none
  }`;
    }
    return '';
  }}
`;
