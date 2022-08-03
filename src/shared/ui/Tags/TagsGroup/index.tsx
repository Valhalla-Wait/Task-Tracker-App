/* eslint-disable react/jsx-indent */
/* eslint-disable prefer-const */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { Modal as ModalAntd, Popover, Typography } from 'antd';
import { TagsEffects, TagsTypes } from 'store';
import { Tag, TagAssign, TagCreate, Helpers } from 'shared';

const { isDoubleClick } = Helpers;
const { TagsBorderColors } = Helpers.Const;
const { Paragraph: ParagraphAntd } = Typography;

type TagsGroupProps = {
  taskId: string;
  taskTags: TagsTypes.TagType[];
  checkRoles: { id: string; isAuthor: boolean; nameRole: string }[];
  collapsable?: boolean;
};

export const TagsGroup: React.FC<TagsGroupProps> = (props) => {
  const { taskId, taskTags, checkRoles, collapsable } = props;
  const dispatch = useDispatch();
  const [editedTag, setEditedTag] = useState('');

  const [assignTagVisible, setAssignTagVisible] = useState<boolean | undefined>(false);

  const unAssignTag = (tagId: string) => {
    dispatch(TagsEffects.unAssignTagFromTask({ body: { task_tag_id: tagId }, task_id: taskId }));
  };

  const onTagClickHandler = (e: React.MouseEvent, tagId: string) => {
    if (isDoubleClick(e)) {
      setEditedTag(tagId);
    }
  };

  const modalCancelHandler = () => {
    setEditedTag('');
  };

  const setArrowColor = (tagColor: TagsTypes.TagsColorType) =>
    document.body.style.setProperty('--arrow-color', TagsBorderColors[tagColor]);

  const resetArrowColor = () => document.body.style.setProperty('--arrow-color', '');

  const userId = Helpers.Cookies.getUserIdCookies();
  const roleObs = checkRoles.filter(({ nameRole }) => nameRole === 'Наблюдатель');
  const roleId = checkRoles.map(({ id }) => id);

  const disabledClose = () => {
    if (roleObs.map((el) => el.id).includes(userId) || !roleId.includes(userId)) {
      return false;
    }
    return true;
  };

  return (
    <Wrap dis={disabledClose()}>
      <Desktop dis={disabledClose()}>
        {taskTags.slice(0, 3).map((tag) => (
          <Tag
            mCollapsable={collapsable}
            key={tag.task_tag_id}
            color={tag.color}
            closable={disabledClose()}
            onClick={(e) => onTagClickHandler(e, tag.task_tag_id)}
            onClose={() => unAssignTag(tag.task_tag_id)}
            onMouseEnter={() => setArrowColor(tag.color)}
            onMouseLeave={resetArrowColor}
          >
            <Paragraph
              color={TagsBorderColors[tag.color]}
              ellipsis={{ tooltip: <Tag color={tag.color}>{tag.name}</Tag>, rows: 1 }}
            >
              {tag.name}
            </Paragraph>
          </Tag>
        ))}

        {taskTags.length > 3 ? (
          <Popover
            placement="bottom"
            visible={editedTag ? false : assignTagVisible || undefined}
            mouseLeaveDelay={0.5}
            overlayInnerStyle={{ borderRadius: '12px' }}
            trigger={['hover', 'click']}
            content={
              <Popup>
                {taskTags.slice(3).map((tag) => (
                  <Tag
                    key={tag.task_tag_id}
                    color={tag.color}
                    closable
                    onClick={(e) => onTagClickHandler(e, tag.task_tag_id)}
                    onClose={() => unAssignTag(tag.task_tag_id)}
                  >
                    {tag.name}
                  </Tag>
                ))}
                <Popover
                  destroyTooltipOnHide
                  visible={assignTagVisible}
                  placement="bottom"
                  overlayInnerStyle={{ borderRadius: '12px' }}
                  trigger="click"
                  onVisibleChange={(visible) => {
                    if (!visible) setAssignTagVisible(undefined);
                  }}
                  content={
                    <TagAssign
                      taskId={taskId}
                      usedTags={taskTags}
                      setParentVisible={setAssignTagVisible}
                    />
                  }
                >
                  <Tag color="default" onClick={() => setAssignTagVisible((prev) => !prev)}>
                    +
                  </Tag>
                </Popover>
              </Popup>
            }
          >
            <More>{`+${taskTags.length - 3}`}</More>
          </Popover>
        ) : (
          <Popover
            destroyTooltipOnHide
            visible={assignTagVisible}
            placement="bottom"
            overlayInnerStyle={{ borderRadius: '12px' }}
            trigger="click"
            onVisibleChange={(visible) => {
              if (!visible) setAssignTagVisible(undefined);
            }}
            content={
              <TagAssign
                taskId={taskId}
                usedTags={taskTags}
                setParentVisible={setAssignTagVisible}
              />
            }
          >
            <Tag
              mHidden={collapsable}
              color="default"
              onClick={() => setAssignTagVisible((prev) => !prev)}
            >
              {taskTags.length ? '+' : '+ Добавить тег'}
            </Tag>
          </Popover>
        )}

        <Modal
          title="Редактирование тега"
          visible={!!editedTag}
          footer={null}
          centered
          destroyOnClose
          onCancel={modalCancelHandler}
        >
          <TagCreate taskId={taskId} tagId={editedTag} setEditedTag={setEditedTag} />
        </Modal>
      </Desktop>
    </Wrap>
  );
};

const Wrap = styled.div<{ dis: boolean }>`
  ${({ dis }) => (dis ? '' : 'cursor: not-allowed; width: fit-content')}
`;

const Desktop = styled.div<{ dis: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  ${({ dis }) => (dis ? '' : 'pointer-events: none; opacity: 0.3;')}

  > * {
    max-width: calc(50% - 4px);
  }

  > :last-child {
    max-width: none;
  }
`;

const Paragraph = styled(ParagraphAntd)<{ color: string }>`
  color: ${(props) => props.color};
  margin: 0 !important;
`;

const Modal = styled(ModalAntd)`
  width: 312px !important;
  height: 150px !important;

  .ant-modal-body {
    padding: 12px 16px;
  }
  .ant-modal-content {
    border-radius: 16px;
  }
  .ant-modal-header {
    border: 0;
    border-radius: 16px;
    padding: 16px 24px 0 16px;
  }
`;

const More = styled.div`
  display: flex;
  height: 24px;
  font: var(--h6-12_16-medium);
  margin: 4px 2px;
  padding: 0 11px 0 11px;
  align-items: center;
  justify-content: space-between;
  user-select: none;

  @media (max-width: 560px) {
    pointer-events: none;
  }
`;

const Popup = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 280px;
`;
