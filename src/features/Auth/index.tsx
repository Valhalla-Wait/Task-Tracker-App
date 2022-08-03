import React, { useEffect, useState } from 'react';
import { Form, Typography } from 'antd';
import styled from 'styled-components';
import { Button, Input } from 'shared';
import { useDispatch, useSelector } from 'react-redux';
import { AuthEffects, AuthSelectors } from 'store';
import { Shaking } from './Animation';

const { Title, Text } = Typography;

type FormValuesType = {
  user_id: string;
};

export const Auth = () => {
  const dispatch = useDispatch();
  const status = useSelector(AuthSelectors.authStatusSelector);
  const [form] = Form.useForm<FormValuesType>();
  const [isAuthErr, setIsAuthErr] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (status === 'fail') {
      setIsAuthErr(true);
      setIsAnimating(true);
    }
  }, [status]);

  const onFinish = (values: FormValuesType) => {
    dispatch(AuthEffects.fetchToken(values));
  };

  const onFinishFailed = () => {
    setIsAnimating(true);
  };

  const onValuesChange = () => {
    setIsAuthErr(false);
    setIsAnimating(false);
    form.setFields([{ name: 'user_id', errors: [] }]);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  return (
    <Wrapper>
      <Form
        form={form}
        name="user"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        validateTrigger="onSubmit"
        requiredMark={false}
      >
        <Title level={2}>Авторизация</Title>

        <Shaking isAnimating={isAnimating} onLoopComplete={stopAnimation}>
          <Form.Item
            label={<Text className="id">Введите ID</Text>}
            name="user_id"
            validateTrigger="onSubmit"
            validateStatus={isAuthErr ? 'error' : undefined}
            rules={[
              { required: true, message: <Text className="mini">Введите ID пользователя!</Text> },
              {
                pattern: /^[0-9]*$/,
                message: <Text className="mini">Неправильный формат данных</Text>,
              },
            ]}
            help={
              isAuthErr ? (
                <Text className="mini">Пользователь с указанным id не существует</Text>
              ) : undefined
            }
          >
            <Input className="input" />
          </Form.Item>
        </Shaking>

        <Form.Item wrapperCol={{ span: 24 }} shouldUpdate>
          {() => (
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          )}
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled('div')`
  width: 424px;
  max-height: 352px;
  min-width: 300px;
  background: var(--color-grey0);
  box-shadow: 0px 8px 56px rgba(23, 23, 37, 0.04);
  border-radius: 16px;
  padding: 56px;
  margin: 10px;
  box-sizing: border-box;
  h2 {
    font: var(--h2-24_32-medium);
    margin-bottom: 40px;
  }
  .id {
    font: var(--paragraph-14_24-regular);
    color: var(--color-grey600);
    margin-bottom: 8px;
  }
  .mini {
    font: var(--mini-10_16-regular);
    color: var(--color-error-default);
    text-align: right;
    margin: 0;
  }
  .input {
    height: 48px;
  }
`;
