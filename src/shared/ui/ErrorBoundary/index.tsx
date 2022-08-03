import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Image } from 'antd';
import styled from 'styled-components';
import { Button } from '../Button';
import imgError from './error-img.png';

type ErrorBoundaryProps = {
  children: ReactNode;
};
type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <NotificationWrap>
          <Notification>
            <h1>Кажется что-то пошло не так. Попробуйте обновить приложение.</h1>
            <Image preview={false} src={imgError} />
            <Button style={{ width: 200 }} onClick={() => window.location.reload()}>
              Oбновить
            </Button>
          </Notification>
        </NotificationWrap>
      );
    }
    return children;
  }
}

const NotificationWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Notification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 15px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  h1 {
    font: var(--h3-20_32-regular);
    color: var(--color-grey600);
  }
`;
