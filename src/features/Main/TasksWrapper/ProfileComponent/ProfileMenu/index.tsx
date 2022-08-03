import React, { useState } from 'react';
import { Avatar, Dropdown, Menu, MenuProps, Popover, Space } from 'antd';
import { Helpers, MenuArrowButton, Icons } from 'shared';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions, UsersSelectors } from 'store';
import { PersonalArea } from './PersonalArea';
import s from './index.module.css';

const { getInitials } = Helpers;

type PropsType = {
  userLogo: string | null;
  userName: string;
  userId: string;
};

const { ExitProfileIcon, MyProfileIcon } = Icons;

export const ProfileMenu = ({ userLogo, userName, userId }: PropsType) => {
  const [activeMenuBtn, setToggle] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const allUsers = useSelector(UsersSelectors.usersSelector);
  const dispatch = useDispatch();
  const setActiveBtn = () => {
    setToggle(!activeMenuBtn);
    setProfileVisible(false);
  };

  const ProfileMenuHandler: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'user_account':
        break;
      case 'exit':
        dispatch(AuthActions.removeToken());
        break;
      default:
    }
  };
  return (
    <Space direction="vertical">
      <Dropdown
        visible={activeMenuBtn}
        overlay={
          <Menu onClick={ProfileMenuHandler}>
            <Popover
              overlayClassName={s.personal_area}
              placement="leftTop"
              content={PersonalArea}
              trigger="click"
            >
              <Menu.Item key="user_account">
                <button type="button" onClick={() => setProfileVisible(true)}>
                  <MyProfileIcon />
                  Личный кабинет
                </button>
              </Menu.Item>
            </Popover>
            <Menu.Item key="exit">
              <button
                type="button"
                onClick={() => {
                  dispatch(AuthActions.removeToken());
                }}
              >
                <ExitProfileIcon />
                Выход
              </button>
            </Menu.Item>
          </Menu>
        }
        onVisibleChange={setActiveBtn}
        placement="bottomRight"
        trigger={profileVisible ? ['click'] : ['hover']}
      >
        <div>
          <Avatar
            style={{
              background:
                allUsers.find((user) => user.user_id === userId)?.color ?? 'var(--color-grey700)',
            }}
            src={userLogo}
            icon={getInitials(userName)}
            onError={() => true}
          />
          <button type="button" className="ant-dropdown-link">
            <MenuArrowButton isActive={activeMenuBtn} />
          </button>
        </div>
      </Dropdown>
    </Space>
  );
};
