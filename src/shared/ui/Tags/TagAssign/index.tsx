import { Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Tag, TagCreate } from 'shared';
import { TagsEffects, TagsSelectors, TagsTypes } from 'store';
import styled from 'styled-components';

type TagAssignPropsType = {
  taskId: string;
  usedTags: TagsTypes.TagType[];
  setParentVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

export const TagAssign: React.FC<TagAssignPropsType> = (props) => {
  const { taskId, usedTags, setParentVisible } = props;
  const dispatch = useDispatch();
  const availableTags = useSelector(TagsSelectors.tagsSelector);
  const toUseTags = availableTags.filter(
    (tag) => usedTags.findIndex((used) => used.task_tag_id === tag.task_tag_id) === -1,
  );
  const [filteredTags, setFilterdTags] = useState(toUseTags);
  const [createTagPopupVisible, setCreateTagPopupVisible] = useState(false);

  useEffect(() => setFilterdTags(toUseTags), [availableTags]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFilterdTags(toUseTags.filter((tag) => tag.name.toLowerCase().includes(value.toLowerCase())));
  };

  const assignTag = (tagId: string) => {
    dispatch(TagsEffects.assignTagToTask({ body: { task_tag_id: tagId }, task_id: taskId }));
    setFilterdTags((prev) => prev.filter((tag) => tag.task_tag_id !== tagId));
    setParentVisible(false);
  };

  return (
    <>
      <Input size="small" onChange={inputHandler} placeholder="Поиск" />
      <TagsBox>
        {filteredTags.map((tag) => (
          <Tag key={tag.task_tag_id} color={tag.color} onClick={() => assignTag(tag.task_tag_id)}>
            {tag.name}
          </Tag>
        ))}
      </TagsBox>
      <Popover
        placement="bottom"
        trigger="click"
        visible={createTagPopupVisible}
        overlayInnerStyle={{ borderRadius: '12px' }}
        destroyTooltipOnHide
        content={<TagCreate taskId={taskId} setParentVisible={setParentVisible} />}
      >
        <Tag color="default" onClick={() => setCreateTagPopupVisible((prev) => !prev)}>
          + Создать новый тег
        </Tag>
      </Popover>
    </>
  );
};

const TagsBox = styled.div`
  width: 280px;
  max-height: 64px;
  margin: 5px 0;
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--color-mainblue-default);
    border-radius: 4px;
    box-shadow: inset 0 0 5px var(--color-blue);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #253861;
  }
`;
