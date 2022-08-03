import React from 'react';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { UsersSelectors } from 'store';
import styled from 'styled-components';
import { Helpers } from 'shared';
import { Datum } from 'store/slice/history/types';

const { operationsDate, getInitials } = Helpers;

export const ActionsItem = (props: { action: Datum }) => {
  const { action } = props;
  const allUsers = useSelector(UsersSelectors.usersSelector);

  return (
    <Wrap key={action.history_command_id}>
      <Avatar
        icon={getInitials(action.user.name)}
        style={{
          background:
            allUsers.find((user) => user.user_id === action.user.user_id)?.color ??
            'var(--color-grey700)',
        }}
        src={action.user.logo}
        onError={() => true}
      />
      <Action>
        <User>
          {action.user.name}
        </User>
        <UserAction>
          {action.command_name}
        </UserAction>
        <Time>
          {operationsDate(action.created)}
        </Time>
      </Action>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 25px;

  @media (max-width: 1210px) {
    .modal_actions_box {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const Action = styled.div`
  display: grid;
  width: 100%;
  margin-left: 10px;
  gap: 10px;
  justify-content: space-between;
  align-self: center;
  grid-template-areas: 'name action time';
  grid-template-columns: min-content 1fr min-content;

  @media (max-width: 1400px) {
    gap: 0;
    grid-template-areas: 'name time' 'action time';
    grid-template-columns: auto min-content;
  }

  @media (max-width: 1210px) {
    grid-template-areas: 'name' 'action' 'time';
    grid-template-columns: auto;
  }
`;

const User = styled.div`
  grid-area: name;

  color: var(--color-grey900);
  font: var(--paragraph-14_20-semibold);
  white-space: nowrap;
  max-width: 167px;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1400px) {
    margin: 3px 0 3px;
  }
`;

const UserAction = styled.div`
  grid-area: action;
  color: var(--color-grey900);
  font: var(--paragraph-14_20-regular);
`;

const Time = styled.div`
  grid-area: time;
  color: var(--color-grey600);
  font: var(--h6-12_16-medium);
  white-space: nowrap;
`;
