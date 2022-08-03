/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Collapse as CollapseAnt, CollapseProps, Avatar, Popover } from 'antd';
import styled, { css } from 'styled-components';
import { Helpers, MenuArrowButton } from 'shared';
import { useSelector } from 'react-redux';
import { OneTaskSelectors, Types, UsersSelectors } from 'store';
import { SearchUsers } from './SearchUsers';
import { MembersItem } from './MembersItem';

const { Panel } = CollapseAnt;
const { getInitials } = Helpers;

type MembersBlockPropsType = {
  taskId: string;
};

export const MembersBlock: React.FC<MembersBlockPropsType> = (props) => {
  const { taskId } = props;
  const [activeMenuBtn, setToggle] = useState<boolean>(false);
  const setActiveBtn = () => {
    setToggle(!activeMenuBtn);
  };

  const userAuthor = useSelector(OneTaskSelectors.userAuthorSelector);
  const userObserver = useSelector(OneTaskSelectors.userObserverSelector);
  const userResponsible = useSelector(OneTaskSelectors.userResponsibleSelector);
  const checkObserverRole = useSelector(OneTaskSelectors.currentUserIsObserverSelector);
  const checkUnknownRole = useSelector(OneTaskSelectors.currentUserIsUnknownSelector);
  const allUsers = useSelector(UsersSelectors.usersSelector);
  return (
    <Collapse
      expandIcon={() => <MenuArrowButton isActiveModal={activeMenuBtn} />}
      bordered={false}
      onChange={setActiveBtn}
    >
      <Panel header="Участники" key="1">
        <Wrap>
          <div className="modal_author_title">Автор</div>
          <div className="modal_author">
            {userAuthor.map((el) => (
              <div key={el.id}>
                <Avatar
                  style={{
                    background:
                      allUsers.find((user) => user.user_id === el.id)?.color ??
                      'var(--color-grey700)',
                  }}
                  icon={getInitials(el.name)}
                  onError={() => true}
                  size={18}
                  src={el.logo}
                />
                <span className="modal_user_name">
{el.name}
                </span>
              </div>
            ))}
          </div>

          <MembersItem
            userArrRoles={userObserver}
            userTitle="Наблюдатель"
            classStyle1="modal_observer_title"
            classStyle2="modal_observer"
            taskId={taskId}
            rolesId={Types.RolesId.observer}
          />
          <MembersItem
            userArrRoles={userResponsible}
            userTitle="Исполнитель"
            classStyle1="modal_responsible_title"
            classStyle2="modal_responsible"
            taskId={taskId}
            rolesId={Types.RolesId.responsible}
          />
        </Wrap>
        <BtnDis disabled={checkObserverRole || checkUnknownRole}>
          <Popover placement="bottom" content={<SearchUsers taskId={taskId} />} trigger="click">
            <button
              disabled={checkObserverRole || checkUnknownRole}
              className="modal_add_users"
              type="button"
            >
              + Добавить участника
            </button>
          </Popover>
        </BtnDis>
      </Panel>
    </Collapse>
  );
};

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr;
  gap: 10px;
  align-items: top;
  justify-items: left;
  grid-template-areas:
    'authorTitle author'
    'observerTitle observer'
    'responsibleTitle responsible';

  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'authorTitle'
      'author'
      'observerTitle'
      'observer'
      'responsibleTitle '
      'responsible';
  }

  .modal_author_title {
    grid-area: authorTitle;
    font: var(--paragraph-14_24-regular);
    color: var(--color-grey800);
  }
  .modal_author {
    grid-area: author;
    white-space: nowrap;
    max-width: 157px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .modal_observer_title {
    grid-area: observerTitle;
    font: var(--paragraph-14_24-regular);
    color: var(--color-grey800);
  }
  .modal_observer {
    grid-area: observer;
    white-space: nowrap;
    max-height: 69px;
    padding-right: 3px;
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
  }
  .modal_responsible_title {
    grid-area: responsibleTitle;
    font: var(--paragraph-14_24-regular);
    color: var(--color-grey800);
  }
  .modal_responsible {
    grid-area: responsible;
    white-space: nowrap;
  }

  .modal_user_name {
    margin-left: 7px;
    color: var(--color-grey800);
    font: var(--paragraph-14_20-regular);
    flex: 1 1 auto;
    max-width: 157px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .modal_add_users {
    font: var(--h6-12_16-medium);
    color: var(--color-mainblue-default);
    button:disabled {
      cursor: not-allowed;
    }
  }
  .modal_user_delite {
    background: none;
    border: none;
    font-size: 12px;
    margin-left: 5px;
    padding: 0;
    cursor: pointer;
    :disabled {
      cursor: not-allowed;
    }
  }
  .modal_user_wrap {
    display: flex;
    align-items: center;
    margin: 3px 0px;
    padding: 4px 6px;
    border: 1px solid var(--color-grey500);
    border-radius: 16px;
    background-color: var(--color-grey200);
  }
`;

const BtnDis = styled((props) => <div {...props} />)`
  ${({ disabled }) => {
    if (disabled) {
      return css`
        cursor: not-allowed !important;
        opacity: 0.5;
      `;
    }
    return null;
  }}
`;

const Collapse = styled(CollapseAnt)<CollapseProps>`
  .ant-collapse-header {
    font: var(--h6-12_16-bold) !important;
    color: var(--color-grey900) !important;
    text-transform: uppercase;
    div {
      margin-right: 3px;
    }
    ::after {
      content: '';
      display: inline-block;
      margin-top: 6px;
      margin-left: 12px;
      border: 1px solid var(--color-grey300);
      width: 100%;
    }
  }
  .modal_add_users {
    font: var(--h6-12_16-medium);
    color: var(--color-mainblue-default);
    background: none;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    margin-top: 30px;
  }
  .ant-collapse-content > .ant-collapse-content-box {
    padding-left: 32px;
    @media (max-width: 939px) {
      padding-left: 18px;
    }
  }
  .site-collapse-custom-collapse .site-collapse-custom-panel {
    margin-bottom: 24px;
    overflow: hidden;
    background: #f7f7f7;
    border: 0px;
    border-radius: 2px;
  }
`;
