/* eslint-disable camelcase */
import React from 'react';
import { useSelector } from 'react-redux';
import { ProfileSelectors } from 'store';
import styled from 'styled-components';
import { ProfileMenu } from './ProfileMenu';
import { SubcribeHeaderPopover } from './SubcribeHeaderPopover';

export const ProfileComponent = () => {
  const { logo, name, user_id } = useSelector(ProfileSelectors.profileSelector);
  return (
    <Profile>
      <div className="profile_side_wrapper">
        <SubcribeHeaderPopover />
        <ProfileMenu userLogo={logo} userName={name} userId={user_id} />
      </div>
    </Profile>
  );
};

const Profile = styled.div`
  display: grid;
  grid-template-rows: 35px auto;
  justify-items: end;
  .profile_side_wrapper {
    display: grid;
    grid-template-columns: 33px auto;
    column-gap: 13px;
    align-items: center;
    @media (min-width: 768px) {
      button div svg path {
        transition: all 0.3s ease 0s;
      }

      button div svg:hover path:nth-child(1) {
        fill: #030303;
        transition: all 0.3s ease 0s;
      }
    }
  }

  .sub_button_icon svg {
    fill: #804848;
  }
  .profile_menu {
    width: 155px;
    overflow: hidden;
  }
  .ant-dropdown-trigger {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 13px;
  }
`;
