import { ExclamationCircleFilled } from '@ant-design/icons';
import { Form, Modal, Radio, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Tag, Helpers } from 'shared';
import { TagsEffects, TagsSelectors, TagsTypes, Types } from 'store';
import styled from 'styled-components';

const { Text } = Typography;
const { TagsColors, TagsBorderColors, TagsFillColors } = Helpers.Const;
const { confirm } = Modal;

type TagCreatePropsType = {
  taskId: string;
  tagId?: string;
  setEditedTag?: React.Dispatch<React.SetStateAction<string>>;
  setParentVisible?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

type FormValuesType = {
  name: string;
  color: TagsTypes.TagsColorType;
  action: 'add' | 'save' | 'del';
};

export const TagCreate: React.FC<TagCreatePropsType> = (props) => {
  const dispatch = useDispatch();
  const { tagId, taskId, setEditedTag, setParentVisible } = props;
  const availableTags = useSelector(TagsSelectors.tagsSelector);
  // const tagsErr = useSelector(TagsSelectors.tagsErrSelector);
  const tagsStatus = useSelector(TagsSelectors.tagsStatusSelector);
  const [prevTagsStatus, setPrevTagsStatus] = useState<Types.ReducerStatusType>(null);
  const editedTag =
    availableTags.find((tag) => tag.task_tag_id === tagId) || ({} as TagsTypes.TagType);

  const [form] = Form.useForm<FormValuesType>();

  useEffect(() => {
    if (prevTagsStatus && tagsStatus === 'success') {
      if (setEditedTag) setEditedTag('');
    }
    // if (prevTagsStatus && tagsStatus === 'fail') message.error(tagsErr);
    setPrevTagsStatus(tagsStatus);
  }, [tagsStatus]);

  useEffect(() => {
    window.addEventListener('keyup', isPressEnter);
    return () => {
      window.removeEventListener('keyup', isPressEnter);
    };
  }, []);

  const isPressEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') form.submit();
  };

  const formFinishHandler = (values: FormValuesType) => {
    const { name, color, action } = values;

    switch (action) {
      case 'add':
        dispatch(TagsEffects.createTag({ body: { color, name }, task_id: taskId }));
        if (setParentVisible) setParentVisible(false);
        break;

      case 'save':
        confirm({
          width: '450px',
          title: 'Вы действительно хотите изменить этот тег?',
          icon: <ExclamationCircleFilled />,
          content: 'Возможно, этот тег используется в других задачах!',
          centered: true,
          okText: 'Да',
          okType: 'danger',
          cancelText: 'Нет',
          onOk() {
            dispatch(
              TagsEffects.editTag({
                body: { color, name },
                tag_id: tagId!,
              }),
            );
          },
        });
        break;

      case 'del':
        confirm({
          width: '450px',
          wrapClassName: 'DelConfirm',
          title: 'Вы действительно хотите удалить этот тег?',
          icon: <ExclamationCircleFilled />,
          content: 'Возможно, этот тег используется в других задачах!',
          centered: true,
          okText: 'Да',
          okType: 'danger',
          cancelText: 'Нет',
          onOk() {
            dispatch(TagsEffects.removeTag(tagId!));
          },
        });
        break;

      default:
    }
  };

  return (
    <Popup>
      <Form
        form={form}
        name="CEDTag"
        layout="vertical"
        onFinish={formFinishHandler}
        validateTrigger="onSubmit"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          validateTrigger="onChange"
          initialValue={editedTag.name}
          rules={[
            {
              required: true,
              message: <Text className="mini">Введите название</Text>,
              validateTrigger: 'onSubmit',
            },
            {
              max: 20,
              message: <Text className="mini">Название тега не должно превышать 20 символов</Text>,
            },
            {
              validator: async (_, value) => {
                if (
                  editedTag.name !== value &&
                  !!availableTags.find(
                    (tag) => tag.name.toLowerCase() === value.slice(0, 20).toLowerCase(),
                  )
                ) {
                  throw new Error();
                }
              },
              message: <Text className="mini">Тег с таким названием существует</Text>,
            },
          ]}
        >
          <Input size="small" placeholder="Название" />
        </Form.Item>

        <Form.Item name="color" initialValue={editedTag.color || 'default'}>
          <ColorGroup>
            {TagsColors.map((color) => (
              <ColorButton
                key={color}
                value={color}
                borderColor={TagsBorderColors[color]}
                backgroundColor={TagsFillColors[color]}
              />
            ))}
          </ColorGroup>
        </Form.Item>

        <Form.Item name="action" initialValue={tagId ? 'save' : 'add'}>
          <ButtonGroup>
            {!tagId ? (
              <Radio.Button type="primary" value="add" onClick={form.submit}>
                <Tag color="default">Добавить</Tag>
              </Radio.Button>
            ) : (
              <>
                <Radio.Button type="primary" value="save" onClick={form.submit}>
                  <Tag color="default">Сохранить</Tag>
                </Radio.Button>
                <Radio.Button type="primary" value="del" onClick={form.submit}>
                  <Tag color="default">Удалить</Tag>
                </Radio.Button>
              </>
            )}
          </ButtonGroup>
        </Form.Item>
      </Form>
    </Popup>
  );
};

const Popup = styled.div`
  display: flex;
  flex-direction: column;
  .mini {
    font: var(--mini-10_16-regular);
    color: var(--color-error-default);
    text-align: left;
    margin: 0;
  }
  .ant-form-item {
    margin: 0;
  }
`;

const ColorGroup = styled(Radio.Group)`
  width: 280px;
  margin: 5px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColorButton = styled(Radio)<{ borderColor: string; backgroundColor: string }>`
  height: 30px;
  width: 30px;
  margin: 0;
  padding: 2px;
  align-items: center;
  justify-content: center;
  .ant-radio {
    top: 0;
    height: 26px;
    width: 26px;
  }
  .ant-radio-inner {
    height: 26px;
    width: 26px;
    background-color: ${(p) => p.backgroundColor} !important;
    border: 2px solid ${(p) => p.borderColor} !important;
    box-shadow: none;
    :after {
      background-color: ${(p) => p.borderColor};
    }
  }
`;

const ButtonGroup = styled(Radio.Group)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  .ant-radio-button-wrapper {
    border: none;
    margin: 0;
    padding: 0;
    :focus-within {
      box-shadow: none;
    }
    ::before {
      display: none;
    }
  }
`;
