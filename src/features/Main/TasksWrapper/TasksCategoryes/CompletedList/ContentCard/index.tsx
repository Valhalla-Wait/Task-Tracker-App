/* eslint-disable indent */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  DescriptionTaskTitle,
  StatusWorkSelect,
  AvatarSelect,
  EditorSelect,
  CheckListInfo,
  ProgressBar,
  TagsGroup,
  DocInfo,
} from 'shared';
import { OneTaskEffects, Types } from 'store';
import styled, { css } from 'styled-components';

type ContentCardPropsType = {
  item: Types.TaskCardType;
};

export const ContentCard: React.FC<ContentCardPropsType> = (props) => {
  const {
    item: { title, storage_files_meta, progress, tags, status, task_id, roles },
  } = props;

  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(OneTaskEffects.fetchOneTask(task_id));
  };

  const checkRoles = roles.map((el) => ({
    id: el.assign_user.user_id,
    isAuthor: el.task_role.is_author,
    nameRole: el.task_role.name,
  }));
  return (
    <Wrap needSecondRow={!!(progress || storage_files_meta.total)}>
      <div className="col-1">
        <button type="button" onClick={openModal}>
          <DescriptionTaskTitle taskTitle={title} />
        </button>
      </div>
      <div className="col-2">
        {storage_files_meta.total ? <DocInfo taskAttachCount={storage_files_meta.total} /> : null}
      </div>
      <div className="col-3">
        {progress ? (
          <CheckListInfo
            taskCheckListCompleted={progress?.completed}
            taskCheckListTotal={progress?.total}
          />
        ) : null}
      </div>
      <div className="col-4">
        <StatusWorkSelect checkRoles={checkRoles} status={status} taskId={task_id} />
      </div>
      <div className="col-5">
        <TagsGroup
          checkRoles={checkRoles}
          taskTags={tags.map((tag) => tag.task_tag)}
          taskId={task_id}
          collapsable
        />
      </div>
      <div className="col-6">
        {progress && <ProgressBar progressPercent={progress.percent} />}
      </div>
      <div className="col-7">
        <AvatarSelect users={roles} />
      </div>
      <div className="col-8">
        <EditorSelect taskId={task_id} statusId={status.task_status_id} checkRoles={checkRoles} />
      </div>
    </Wrap>
  );
};

type WrapProps = {
  needSecondRow: boolean;
};

const Wrap = styled.div<WrapProps>`
  height: 96px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 3px;
  grid-auto-flow: dense;
  background-color: var(--color-grey0);
  padding: 16px 9px;
  border-radius: 20px;
  align-items: center;
  justify-items: center;

  .col-1 {
    grid-column: span 4;
    justify-self: flex-start;
  }
  .col-2 {
    grid-column: span 1;
    display: flex;
    font: var(--paragraph-14_16-regular);
    color: var(--color-grey700);
  }
  .col-3 {
    grid-column: span 1;
    display: flex;
    font: var(--paragraph-14_16-regular);
    color: var(--color-grey700);
    span {
      margin-right: 5px;
    }
  }
  .col-4 {
    grid-column: span 2;
  }
  .col-5 {
    grid-column: span 4;
    width: 100%;
  }

  .col-6 {
    grid-column: span 3;
    width: 100%;
  }
  .col-7 {
    grid-column: span 3;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .col-8 {
    font-size: 24px;
  }

  @media (max-width: 1670px) {
    height: auto;
    min-height: 96px;
    grid-template-columns: repeat(17, minmax(50px, 1fr));
    ${({ needSecondRow }) => {
      if (needSecondRow) {
        return css`
          grid-template-rows: repeat(2, minmax(50px, 1fr));
        `;
      }
      return css`
        grid-template-rows: repeat(1, minmax(50px, 1fr));
      `;
    }}
    .col-2 {
      order: 8;
    }
    .col-3 {
      order: 9;
    }
  }
  @media (max-width: 1340px) {
    grid-template-columns: repeat(2, minmax(50px, 1fr));
    grid-template-rows: repeat(5, minmax(50px, 1fr));
    .col-1 {
      grid-column: 1/4;
      justify-self: flex-start;
    }
    .col-2 {
      grid-column: 3/4;
      grid-row: 5;
      justify-self: flex-end;
    }
    .col-3 {
      grid-column: 4/5;
      grid-row: 5;
      justify-self: flex-start;
      margin-left: 5px;
    }
    .col-4 {
      grid-column: 1/5;
      justify-self: flex-start;
    }
    .col-5 {
      grid-column: 1/2;
      justify-self: start;
    }
    .col-6 {
      grid-column: 1/5;
      justify-self: flex-start;
      @media (max-width: 388px) {
        justify-self: flex-end;
      }
    }
    .col-7 {
      grid-column: 1/5;
      grid-row: 5;
      justify-content: flex-start;
    }
    .col-8 {
      grid-column: 4/5;
      justify-self: center;
    }
  }
`;
