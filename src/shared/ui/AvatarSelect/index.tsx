/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Avatar as AvatarAnt, Popover } from 'antd';
import { Group as GroupAnt } from 'antd/lib/avatar';
import styled from 'styled-components';
import { Types, UsersSelectors } from 'store';
import { useSelector } from 'react-redux';

type AvatarSelectPropsType = {
  users: Types.TaskRoleType[];
};

export const AvatarSelect: React.FC<AvatarSelectPropsType> = (props) => {
  const { users } = props;

  const allUsers = useSelector(UsersSelectors.usersSelector);
  const arrAuthor = users.filter((el) => el.task_role.name === 'Автор задачи');
  const arrExecutor = users.filter((el) => el.task_role.name === 'Ответственный');
  const arrObserver = users.filter((el) => el.task_role.name === 'Наблюдатель');
  const arrOurUsers = [...arrAuthor, ...arrExecutor, ...arrObserver];
  return (
    <Group maxCount={2}>
      {users ?
        arrOurUsers.map((u) => (
            <Popover trigger="hover" content={u.assign_user.name} key={u.assign_user.user_id}>
              <Avatar
                key={u.task_to_role_id}
                src={u.assign_user.logo}
                style={{
                  background:
                    allUsers.find((user) => user.user_id === u.assign_user.user_id)?.color ??
                    'var(--color-grey700)',
                }}
                icon={
                  allUsers.find((user) => user.user_id === u.assign_user.user_id)?.initials ?? ''
                }
                onError={() => true}
              />
            </Popover>
          )) :
        null}
    </Group>
  );
};

const Group = styled(GroupAnt)`
  font: var(--paragraph-14_21-medium);

  .ant-avatar:not(:first-child) {
    margin-left: 10px !important;
  }
  .ant-avatar {
    border: none !important;
  }
  span:nth-child(3) {
    color: var(--color-grey700);
    border-radius: 50%;
    background-color: var(--color-grey0);
    border: 1px solid var(--color-grey300) !important;
    cursor: pointer;
  }
`;
const Avatar = styled(AvatarAnt)`
  width: 32px;
  height: 32px;
`;
