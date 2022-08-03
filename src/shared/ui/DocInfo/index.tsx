import React from 'react';
import { DocIcon } from 'shared/icon';

export const DocInfo = (props: any) => {
  const { taskAttachCount } = props;
  return (
    <>
      <DocIcon />
      <span>
        {taskAttachCount}
      </span>
    </>
  );
};
