import { Button as ButtonAntd, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DescriptionIcon } from 'shared/icon';
import { OneTaskEffects, OneTaskSelectors } from 'store';
import styled from 'styled-components';
import { ContentState, convertToRaw, EditorState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from 'shared';
import BoldTextIcon from './TextEditorIcons/BoldTextIcon.svg';
import ItalicTextIcon from './TextEditorIcons/ItalicTextIcon.svg';
import UnderlineTextIcon from './TextEditorIcons/UnderlineTextIcon.svg';
import LinkTextIcon from './TextEditorIcons/LinkTextIcon.svg';
import AligmentLeftIcon from './TextEditorIcons/AligmentLeftTextIcon.svg';
import AligmentCenterIcon from './TextEditorIcons/AligmentCenterTextIcon.svg';
import AligmentRightIcon from './TextEditorIcons/AligmentRightTextIcon.svg';

const { Paragraph } = Typography;

type DescriptionProps = {
  description: string;
  taskID: string;
};

export const Description: React.FC<DescriptionProps> = (props) => {
  const { description, taskID } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isEllipsis, setIsEllipsis] = useState(false);

  const [newDescription, setNewDescription] = useState(description);
  const canUserEditDescription =
    useSelector(OneTaskSelectors.currentUserIsAuthorSelector) ||
    useSelector(OneTaskSelectors.currentUserIsExecutorSelector);

  const [state, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(newDescription)),
  );
  const dispatch = useDispatch();

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(description);
    const newState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
    setEditorState(EditorState.createWithContent(newState));
  }, []);

  const data = draftToHtml(convertToRaw(state.getCurrentContent()));

  const toggleEditMode = () => {
    setIsEdit((prev) => !prev);
  };

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => !prev);
  };

  const endEdit = () => {
    if (data !== description) {
      dispatch(
        OneTaskEffects.oneTaskDescriptionChange({
          taskID,
          body: { description: data },
        }),
      );
      setNewDescription(data);
    }
    setIsEdit(false);
  };

  const isPressEsc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      setIsEdit(false);
    }
  };

  return (
    <Wrap>
      <Icon>
        <DescriptionIcon />
      </Icon>

      <DescriptionBlock>
        <Header>
          Описание
          {canUserEditDescription && !isEdit ? (
            <EditButton onClick={toggleEditMode}>Изменить</EditButton>
          ) : null}
        </Header>

        {isEdit ? (
          <DescriptionEditor onKeyDown={isPressEsc}>
            <Editor
              editorState={state}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                options: ['inline', 'link', 'emoji', 'textAlign', 'history'],
                inline: {
                  inDropdown: false,
                  options: ['bold', 'underline', 'italic'],
                  bold: { icon: BoldTextIcon },
                  italic: { icon: ItalicTextIcon },
                  underline: { icon: UnderlineTextIcon },
                },
                link: {
                  link: { icon: LinkTextIcon },
                },
                textAlign: {
                  options: ['left', 'center', 'right'],
                  left: { icon: AligmentLeftIcon },
                  center: { icon: AligmentCenterIcon },
                  right: { icon: AligmentRightIcon },
                },
              }}
            />
            <Buttons>
              <Button type="primary" size="small" onClick={endEdit}>
                Сохранить
              </Button>
              <Button type="default" size="small" onClick={toggleEditMode}>
                Отменить
              </Button>
            </Buttons>
          </DescriptionEditor>
        ) : (
          <DescriptionText>
            {isEllipsis ? (
              <>
                <TextEllipsable
                  collapsed={isCollapsed}
                  dangerouslySetInnerHTML={{ __html: newDescription }}
                />
                <Button type="link" size="small" onClick={toggleCollapsed}>
                  {isCollapsed ? 'Показать полностью' : 'Скрыть'}
                </Button>
              </>
            ) : (
              <Paragraph
                ellipsis={{
                  rows: 5,
                  expandable: true,
                  onEllipsis: (ellipsis) => setIsEllipsis(ellipsis),
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: newDescription }} />
              </Paragraph>
            )}
          </DescriptionText>
        )}
      </DescriptionBlock>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  margin: 25px 0 10px;
  align-items: flex-start;
`;

const Icon = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 30px;
  margin-right: 16px;
  align-items: center;
  justify-content: center;
`;

const DescriptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 16px;
  font: var(--h5-16_24-medium);
`;

const DescriptionEditor = styled.div`
  .toolbarClassName {
    display: flex;
    width: 100%;
    box-sizing: content-box;
    padding: 10px 0;
    margin: 0;
    align-items: center;
    border: none;
    border-top: 1px solid var(--color-grey200);
    gap: 30px;
  }

  .editorClassName {
    border-radius: 8px;
    border: 1px solid var(--color-grey200);
    margin: 0 0 8px;
    padding: 0 5px;
  }

  .rdw-option-wrapper {
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    border-radius: 8px;

    :hover {
      border: 1px solid var(--color-grey600);
      background-color: var(--color-grey200);
    }
  }

  .rdw-option-active {
    background-color: var(--color-grey300);
  }

  .rdw-inline-wrapper,
  .rdw-link-wrapper,
  .rdw-emoji-wrapper,
  .rdw-text-align-wrapper,
  .rdw-history-wrapper {
    margin: 0;
    border: none;
    gap: 15px;
  }
`;

const TextEllipsable = styled.div<{ collapsed: boolean }>`
  overflow: hidden;
  display: ${(p) => (p.collapsed ? '-webkit-box' : 'block')};
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const EditButton = styled(ButtonAntd)`
  background: var(--color-grey200);
  color: var(--color-grey600);
  border: none;
  border-radius: 8px;
  height: 24px;
  margin-left: 14px;
  font: var(--h6-12_16-medium);
`;

const Buttons = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  gap: 8px;
`;

const DescriptionText = styled.div`
  font: var(--paragraph-14_20-regular);
  color: var(--color-grey700);

  button {
    width: min-content;
    padding: 0;
    margin-top: 16px;
    font: var(--paragraph-14_24-regular);
    color: var(--color-mainblue-default);

    :hover {
      color: var(--color-mainblue-default);
    }

    span {
      text-decoration: underline;
    }
  }
`;
