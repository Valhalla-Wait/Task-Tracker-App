import { Popover, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Button, Input } from 'shared';
import { Helpers } from 'shared/lib';
import { OneTaskEffects, OneTaskSelectors } from 'store';
import styled from 'styled-components';

const { Text } = Typography;

type AddItemProps = {
  checkListID: string;
};

export const AddItem: React.FC<AddItemProps> = (props) => {
  const { checkListID } = props;
  const [isPopupVisible, setIsPopupVisible] = useState<boolean | undefined>();
  const [itemName, setItemName] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const dispatch = useDispatch();

  const checkObserverRole = useSelector(OneTaskSelectors.currentUserIsObserverSelector);
  const checkUnknownRole = useSelector(OneTaskSelectors.currentUserIsUnknownSelector);

  useEffect(() => {
    window.addEventListener('keypress', isPressEnter);
    return () => {
      window.removeEventListener('keypress', isPressEnter);
    };
  }, [itemName]);

  const isPressEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') addItem();
  };

  const addItem = () => {
    if (itemName) {
      dispatch(
        OneTaskEffects.checkListItemAdd({
          body: { message: itemName },
          checkListID,
        }),
      );
      setIsPopupVisible(false);
    } else setIsEmpty(true);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(false);
    setItemName(e.target.value);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const onVisibleChange = (vis: boolean) => {
    if (vis) {
      setItemName('');
      setIsEmpty(false);
      setIsPopupVisible(undefined);
    }
  };

  return (
    <Wrap
      content={
        <>
          <Input
            size="middle"
            placeholder="Введите название пункта"
            value={itemName}
            status={isEmpty ? 'error' : ''}
            onChange={inputChangeHandler}
            autoFocus
          />
          {isEmpty && <Text style={mini}>Введите название</Text>}
          <Buttons>
            <Button size="small" type="primary" onClick={addItem}>
              Добавить
            </Button>
            <Button size="small" onClick={closePopup}>
              Отменить
            </Button>
          </Buttons>
        </>
      }
      trigger="click"
      placement="bottom"
      destroyTooltipOnHide
      overlayStyle={{ width: '230px' }}
      visible={isPopupVisible}
      onVisibleChange={onVisibleChange}
    >
      <Add disabled={checkObserverRole || checkUnknownRole} type="button">
        <Plus>+</Plus>
        Добавить новый пункт
      </Add>
    </Wrap>
  );
};

const Wrap = styled(Popover)`
  display: flex;
  height: 30px;
  align-items: center;
  font: var(--paragraph-14_24-semibold);
  color: var(--color-mainblue-default);
`;

const Add = styled.button`
  border: none;
  background: none;
  margin: 0 0 10px;
  padding: 0;
  :disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const Plus = styled.div`
  display: flex;
  width: 30px;
  margin-right: 16px;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  button {
    width: 95px;
  }
`;

const mini: React.CSSProperties = {
  font: 'var(--mini-10_16-regular)',
  color: 'var(--color-error-default)',
  textAlign: 'right',
  margin: '0',
  width: '200px',
};
