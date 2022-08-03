import React from 'react';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { ProfileSelectors, UsersSelectors } from 'store';
import styled from 'styled-components';
import { Helpers } from 'shared';

const { getInitials } = Helpers;

export const PersonalArea = () => {
  const { logo, name, user_id } = useSelector(ProfileSelectors.profileSelector);
  const allUsers = useSelector(UsersSelectors.usersSelector);
  return (
    <Wrap>
      <Avatar
        style={{
          background:
            allUsers.find((user) => user.user_id === user_id)?.color ?? 'var(--color-grey700)',
        }}
        size={200}
        src={logo}
        icon={getInitials(name)}
        onError={() => true}
      />
      <div className="profile_header_username">
        {name}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile_header_username {
    font: var(--h1-32_40-bold);
    text-align: center;
    margin-top: 20px;
  }
`;
