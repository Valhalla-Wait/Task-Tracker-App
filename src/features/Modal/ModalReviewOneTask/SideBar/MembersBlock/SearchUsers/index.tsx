import React, { useState } from 'react';
import { Input as InputAnt, Avatar, Popover } from 'antd';
import { useSelector } from 'react-redux';
import { OneTaskSelectors, UsersSelectors } from 'store';
import styled from 'styled-components';
import { PlusIcon } from 'shared/icon';
import { Helpers } from 'shared';
import { AddRoles } from '../AddRoles';
import s from './searchUsers.module.css';

const { isDisabledObserver, isDisabledResponsible } = Helpers;

type SearchUsersPropsType = {
  taskId: string;
};

export const SearchUsers: React.FC<SearchUsersPropsType> = (props) => {
  const { taskId } = props;
  const users = useSelector(UsersSelectors.usersSelector);
  const userInfo = useSelector(OneTaskSelectors.userInfoSelector);
  const userResponsible = useSelector(OneTaskSelectors.userResponsibleSelector);
  const [filterdUsers, setFilterdUsers] = useState(users);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterdUsers(users.filter((user) => user.name.toLowerCase().includes(value.toLowerCase())));
  };

  return (
    <>
      <Input
        className={s.modal_input_search}
        onChange={inputHandler}
        size="small"
        placeholder="Поиск"
      />
      <SearchBox>
        {filterdUsers.map((el) => (
          <div key={el.user_id} className="search_flex_wrap">
            <Popover
              className="search_popover"
              placement="left"
              content={
                <AddRoles
                  isDisabledObserver={isDisabledObserver(el.user_id, userInfo)}
                  isDisabledResponsible={isDisabledResponsible(
                    el.user_id,
                    userResponsible,
                    userInfo,
                  )}
                  id={el.user_id}
                  taskId={taskId}
                />
              }
              trigger="click"
            >
              <span className="search_user_icon">
                <PlusIcon />
              </span>
            </Popover>
            <Avatar
              className="search_user_logo"
              size={22}
              src={el.logo}
              style={{ background: el.color, marginRight: '10px' }}
              icon={el.initials}
            />
            <div className="search_user_name">
              {el.name}
            </div>
          </div>
        ))}
      </SearchBox>
    </>
  );
};

const Input = styled(InputAnt)`
  .ant-input {
    border-radius: 12px !important;
  }
`;

const SearchBox = styled.div`
  width: 240px;
  max-height: 150px;
  margin: 5px 0;
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
  .search_flex_wrap {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 7px 0;
  }
  .search_user_name {
    margin-left: 7px;
    color: var(--color-grey900);
    font: var(--paragraph-14_20-regular);
    max-width: 157px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .search_user_logo {
    margin-left: 12px;
  }
  .search_flex_wrap:hover > .search_user_icon {
    opacity: 1;
    visibility: visible;
  }

  .search_user_icon {
    display: flex;
    align-items: center;
    opacity: 0;
    visibility: hidden;
  }
`;
