import React, { useState } from 'react';
import { Menu, Dropdown, Space } from 'antd';
import { Icons, MenuArrowButton } from 'shared';
import { useDispatch } from 'react-redux';
import { AuthActions } from 'store';
import styled from 'styled-components';

const { ExitProfileIcon, MyProfileIcon } = Icons;

export const MenuButton = () => {
  const dispatch = useDispatch();
  const [activeMenuBtn, setToggle] = useState<any>({
    activeButton: null,
    button: {
      id: 1,
    },
  });
  const setActiveBtn = () => {
    if (activeMenuBtn.activeButton === null) {
      setToggle({ ...activeMenuBtn, activeButton: activeMenuBtn.button.id });
    } else {
      setToggle({ ...activeMenuBtn, activeButton: null });
    }
  };

  return (
    <Space direction="vertical">
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <Button>
                <MyProfileIcon />
                Личный кабинет
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                type="button"
                onClick={() => {
                  dispatch(AuthActions.removeToken());
                }}
              >
                <ExitProfileIcon />
                Выход
              </Button>
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
        placement="bottomRight"
      >
        <Button type="button" onClick={setActiveBtn} className="ant-dropdown-link">
          <MenuArrowButton isActive={activeMenuBtn.activeButton !== null} />
        </Button>
      </Dropdown>
    </Space>
  );
};

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
