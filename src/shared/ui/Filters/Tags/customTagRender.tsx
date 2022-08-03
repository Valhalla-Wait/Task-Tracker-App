import React from 'react';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { useSelector } from 'react-redux';
import { TagsSelectors } from 'store';
import { Tag } from 'shared';

export const CustomTagRender = (props: CustomTagProps) => {
  const { value, closable, onClose } = props;
  const tag = useSelector(TagsSelectors.tagsSelector).find((t) => t.task_tag_id === value);

  return (
    <Tag closable={closable} onClose={onClose} color={tag?.color}>
      {tag?.name}
    </Tag>
  );
};
