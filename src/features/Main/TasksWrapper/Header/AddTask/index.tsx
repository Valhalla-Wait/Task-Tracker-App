import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { Icons } from 'shared';
import { OperationsTaskEffects } from 'store';
import styled from 'styled-components';

const { PrefixInputIcon } = Icons;

type InputDataType = {
  title: string;
};

export const AddTask = () => {
  const [form] = Form.useForm<InputDataType>();
  const dispatch = useDispatch();
  const [isAddActive, setIsAddActive] = useState(false);
  const [isFieldErr, setIsFieldErr] = useState(false);

  const showForm = () => {
    setIsAddActive(true);
  };

  const hideForm = () => {
    form.resetFields();
    setIsFieldErr(false);
    setIsAddActive(false);
  };

  const createTask = (values: InputDataType) => {
    const { title } = values;

    dispatch(OperationsTaskEffects.createTask(title));
    hideForm();
  };

  return (
    <Wrap>
      {isAddActive ? (
        <Form
          form={form}
          name="createTask"
          onFinish={createTask}
          onFinishFailed={() => setIsFieldErr(true)}
          layout="inline"
          validateTrigger="onSubmit"
        >
          <Form.Item name="title" rules={[{ required: true, message: 'Введите название' }]}>
            <Input
              className="add_task__field"
              placeholder="Введите название задачи"
              prefix={<PrefixInputIcon status={isFieldErr} />}
            />
          </Form.Item>
          <Buttons>
            <Form.Item>
              <Button htmlType="submit" className="save_btn" type="primary">
                Сохранить
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={hideForm} className="cancel_btn" type="default">
                Отменить
              </Button>
            </Form.Item>
          </Buttons>
        </Form>
      ) : (
        <button onClick={showForm} type="button">
          + НОВАЯ ЗАДАЧА
        </button>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  grid-area: add;
  margin-top: 16px;

  font: var(--h6-12_16-medium);
  color: var(--color-mainblue-default);
  text-align: left;
  .ant-input-affix-wrapper {
    padding: 0;
  }
  .ant-form-item {
    margin-right: 8px;
  }
  .ant-form {
    row-gap: 8px;
  }
  button {
    border-radius: 8px;
  }
  input {
    background: none;
  }
  .ant-form-item-with-help {
    margin-bottom: 0;
  }
  .add_task__field {
    min-width: 200px;
    height: 47px;
    border-top: none;
    border-left: none;
    border-right: none;
    background: none !important;
  }
  .save_btn {
    background-color: var(--color-mainblue-default);
    margin-top: 8px;
    padding: 0 16px;
  }
  .cancel_btn {
    box-shadow: none;
    border: 1px solid var(--color-grey400);
    color: var(--color-grey700);
    background: none;
    margin-top: 8px;
    padding: 0 16px;
  }
`;

const Buttons = styled.div`
  display: flex;
`;
