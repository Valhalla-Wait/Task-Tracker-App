/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Avatar, Image, Popover } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { OneTaskEffects, subscribesEffects, subscribesTypes, UsersSelectors } from 'store';
import styled from 'styled-components';
import { Tag, Icons, Helpers } from 'shared';

const { getBgSubscribes, getBgStatus, getBgPriority, getInitials } = Helpers;

const { CheckIcon, UnCheckIcon } = Icons;

type SubscribesProps = {
  setActiveVisible: () => void;
  item: subscribesTypes.Datum[];
};

export const SubscribesItem: React.FC<SubscribesProps> = (props) => {
  const { setActiveVisible, item } = props;
  const allUsers = useSelector(UsersSelectors.usersSelector);
  const dispatch = useDispatch();
  const openModal = (taskId: string | undefined) => {
    dispatch(OneTaskEffects.fetchOneTask(taskId));
    setActiveVisible();
  };
  return (
    <>
      {item.length > 0 ? (
        item.map((el) => (
          <button
            onClick={() => openModal(el.history_command.params?.task?.task_id)}
            type="button"
            className="subscribes_wrap"
            key={el.subscribe_notify_id}
          >
            <div className="subscribes_user_data_wrap">
              <div className="subscribes_user_wrap">
                <Avatar
                  icon={getInitials(el.history_command.user.name)}
                  style={{
                    background:
                      allUsers.find((user) => user.user_id === el.history_command.user.user_id)
                        ?.color ?? 'var(--color-grey700)',
                  }}
                  onError={() => true}
                  size={20}
                  src={el.history_command.user.logo}
                />
                <div className="subscribes_user_name">
                  {el.history_command.user.name}
                </div>
              </div>
              <div className="subscribes_data_created">
                <span>
                  {moment(el.history_command.created).format('D MMM YYYY, hh:mm')}
                </span>
                <Popover
                  content={el.viewed ? 'Отметить как непрочитанное' : 'Отметить как прочитанное'}
                >
                  <WrapDate bg={getBgSubscribes(el.viewed)}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          subscribesEffects.changeSubscribe({
                            viewed: !el.viewed,
                            subscribe_notify_id: [el.subscribe_notify_id],
                          }),
                        );
                      }}
                      type="button"
                      className="subscribes_data_btn"
                    />
                  </WrapDate>
                </Popover>
              </div>
            </div>

            <div className="subscribes_action_name">
              {el.history_command.command_name}
            </div>

            {el.history_command.params?.assign_user && (
              <div className="subscribes_item">
                {el.history_command.params?.assign_user?.name}
              </div>
            )}
            {el.history_command.params?.check_list && (
              <div className="subscribes_item">
                {el.history_command.params?.check_list?.title}
              </div>
            )}

            {el.history_command.params?.check_list_item &&
              (el.history_command.params?.complete === true ? (
                <div className="subscribes_check_list_item_box">
                  <CheckIcon />
                  <div className="subscribes_check_list_item">
                    {el.history_command.params?.check_list_item?.message}
                  </div>
                </div>
              ) : (
                <div className="subscribes_check_list_item_box">
                  <UnCheckIcon />
                  {el.history_command.params?.check_list_item?.message}
                </div>
              ))}
            {el.history_command.params?.exec_stop && (
              <div className="subscribes_item">
                {moment(el.history_command.params?.exec_stop).format('D MMM YYYY, hh:mm')}
              </div>
            )}

            {el.history_command.params?.message && (
              <div className="subscribes_item">
                {el.history_command.params?.message}
              </div>
            )}

            {el.history_command.params?.priority && (
              <PriorityBox
                bg={getBgPriority(el.history_command.params?.priority?.task_priority_id)}
              >
                {el.history_command.params?.priority?.name}
              </PriorityBox>
            )}

            {el.history_command.params?.status && (
              <StatusBox
                bg={getBgStatus(el.history_command.params?.status?.task_status_id)}
                className="subscribes_status_name"
              >
                {el.history_command.params?.status?.name}
              </StatusBox>
            )}

            {el.history_command.params?.tag && (
              <div className="subscribes_tag_wrap">
                <Tag color={el.history_command.params?.tag?.color}>
                  {el.history_command.params?.tag?.name}
                </Tag>
              </div>
            )}
            {el.history_command.params?.task_role && (
              <div className="subscribes_item">
                {el.history_command.params?.task_role?.name}
              </div>
            )}
            {el.history_command.params?.title && (
              <div className="subscribes_item">
                {el.history_command.params?.title}
              </div>
            )}
            {el.history_command.params?.storage_file && (
              <>
                {el.history_command.params?.storage_file?.type === 'image' ? (
                  <Image
                    preview={false}
                    src={`${process.env.REACT_APP_TASK_BACKEND_URL}storage/files/${el.history_command.params.storage_file.storage_file_id}/download`}
                  />
                ) : (
                  <div>
                    {el.history_command.params?.storage_file?.name_original}
                  </div>
                )}
              </>
            )}
          </button>
        ))
      ) : (
        <div className="subscribes_item_noread">Нет уведомлений</div>
      )}
    </>
  );
};
const WrapDate = styled((props) => <div {...props} />)`
  .subscribes_data_btn {
    cursor: pointer;
    padding: 0px;
    margin: 0px;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => props.bg};
    border: 1px solid #828080;
  }
`;
const StatusBox = styled((props) => <div {...props} />)`
  text-transform: uppercase;
  font: var(--h6-12_16-bold);
  text-transform: uppercase;
  color: var(--color-grey0);
  background: ${(props) => props.bg};
  border-radius: 16px;
  display: inline-block;
  padding: 3px 6px;
`;

const PriorityBox = styled((props) => <div {...props} />)`
  color: var(--color-grey600);
  font: var(--paragraph-14_16-regular);
  margin-left: 10px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: -10px;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => props.bg};
  }
`;
