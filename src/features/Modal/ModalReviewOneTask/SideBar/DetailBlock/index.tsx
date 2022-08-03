/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Avatar, Collapse as CollapseAnt, CollapseProps, Spin } from 'antd';
import { Helpers, MenuArrowButton, PrioritiesSelect, StatusWorkSelect, TagsGroup } from 'shared';
import styled from 'styled-components';
import { OneTaskSelectors, Types, UsersSelectors } from 'store';
import { useSelector } from 'react-redux';
import { DatePickerCustom } from './DatePickerCustom';

const { Panel } = CollapseAnt;
const { getInitials } = Helpers;

export const DetailBlock: React.FC = () => {
  const item: Types.TaskCardDetailType = useSelector(OneTaskSelectors.oneTaskSelector);
  const { roles } = item;
  const checkRoles = roles.map((el) => ({
    id: el.assign_user.user_id,
    isAuthor: el.task_role.is_author,
    nameRole: el.task_role.name,
  }));
  const [activeMenuBtn, setToggle] = useState<boolean>(false);
  const setActiveBtn = () => {
    setToggle(!activeMenuBtn);
  };
  const userResponsible = useSelector(OneTaskSelectors.userResponsibleSelector);
  const allUsers = useSelector(UsersSelectors.usersSelector);
  const statusTag = useSelector(OneTaskSelectors.oneTaskTagStatusSelector);
  return (
    <Collapse
      expandIcon={() => <MenuArrowButton isActiveModal={activeMenuBtn} />}
      bordered={false}
      onChange={setActiveBtn}
    >
      <Panel header="Детали" key="1">
        <Wrap>
          <div className="modal_status_title">Статус</div>
          <div className="modal_status">
            <StatusWorkSelect checkRoles={checkRoles} status={item.status} taskId={item.task_id} />
          </div>
          <div className="modal_worker_title">Назначена</div>
          <div className="modal_worker">
            {userResponsible.map((el) => (
              <div className="modal_worker_wrap" key={el.id}>
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
                <span className="modal_worker_name">{el.name}</span>
              </div>
            ))}
          </div>
          <div className="modal_date_title">Срок</div>
          <div className="modal_date">
            <DatePickerCustom
              checkRoles={checkRoles}
              taskId={item.task_id}
              stopDate={item.exec_stop}
            />
          </div>
          <div className="modal_priority_title">Приоритет</div>
          <div className="modal_priority">
            <PrioritiesSelect
              checkRoles={checkRoles}
              statusId={item.status.task_status_id}
              priority={item.priority}
              taskId={item.task_id}
            />
          </div>
          <div className="modal_tag_title">Метка</div>
          <div className="modal_tag">
            <Spin spinning={statusTag === 'loading'}>
              <TagsGroup
                checkRoles={checkRoles}
                taskTags={item.tags.map((tag) => tag.task_tag)}
                taskId={item.task_id}
              />
            </Spin>
          </div>
        </Wrap>
      </Panel>
    </Collapse>
  );
};

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr;
  gap: 10px;
  align-items: center;
  justify-items: left;

  grid-template-areas:
    'statusTitle status'
    'workerTitle worker'
    'dateTitle date'
    'priorityTitle priority'
    'tagTitle tag';

  @media (max-width: 1400px) {
    grid-template-columns: 1fr;
    gap: 7px;
    grid-template-areas:
      'statusTitle '
      'status'
      'workerTitle '
      'worker'
      'dateTitle '
      'date'
      'priorityTitle'
      'priority'
      'tagTitle '
      'tag';
  }
  .modal_status_title {
    grid-area: statusTitle;
    font: var(--paragraph-14_24-regular);
    color: var(--color-grey800);
  }

  .modal_status {
    grid-area: status;
  }

  .modal_worker_title {
    grid-area: workerTitle;
    font: var(--paragraph-14_24-regular);
    color: var(--color-grey800);
  }
  .modal_worker {
    grid-area: worker;
  }
  .modal_worker_wrap {
    display: flex;
    align-items: center;
  }

  .modal_worker_name {
    margin-left: 7px;
    color: var(--color-grey900);
    font: var(--paragraph-14_20-regular);
    max-width: 157px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .modal_date_title {
    grid-area: dateTitle;
    font: var(--paragraph-14_24-regular);
    color: var(--color-grey800);
  }
  .modal_date {
    grid-area: date;
  }
  .modal_priority_title {
    grid-area: priorityTitle;
    font: var(--paragraph-14_24-regular);
    color: var(--color-grey800);
  }
  .modal_priority {
    grid-area: priority;
  }
  .modal_tag_title {
    grid-area: tagTitle;
    font: var(--paragraph-14_24-regular);
    color: var(--color-grey800);
  }
  .modal_tag {
    grid-area: tag;
    width: 100%;
  }
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
      border: 1px solid #e2e2ea;
      width: 100%;
    }
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
