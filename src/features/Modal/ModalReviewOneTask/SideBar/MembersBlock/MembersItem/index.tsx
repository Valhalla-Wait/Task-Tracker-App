/* eslint-disable max-len */
import { CloseOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helpers } from 'shared';
import { OneTaskSelectors, RolesEffects, Types, UsersSelectors } from 'store';

const { getInitials } = Helpers;

type MembersItemPropsType = {
  userArrRoles: {
    id: string;
    isAuthor: boolean;
    roleName: string;
    name: string;
    logo: string;
  }[];
  userTitle: string;
  classStyle1: string;
  classStyle2: string;
  rolesId: string;
  taskId: string;
};

export const MembersItem: React.FC<MembersItemPropsType> = (props) => {
  const { userArrRoles, userTitle, classStyle1, classStyle2, rolesId, taskId } = props;

  const checkAuthorRole = useSelector(OneTaskSelectors.currentUserIsAuthorSelector);
  const checkExecutorRole = useSelector(OneTaskSelectors.currentUserIsExecutorSelector);
  const allUsers = useSelector(UsersSelectors.usersSelector);

  const dispatch = useDispatch();

  return (
    <>
      <div className={classStyle1}>
        {userTitle}
      </div>
      <div className={classStyle2}>
        {userArrRoles.map((el) => (
          <div className="modal_user_wrap" key={el.id}>
            <Avatar
              style={{
                background:
                  allUsers.find((user) => user.user_id === el.id)?.color ?? 'var(--color-grey700)',
              }}
              icon={getInitials(el.name)}
              onError={() => true}
              size={18}
              src={el.logo}
            />
            <span className="modal_user_name">
              {el.name}
            </span>
            {checkAuthorRole || (checkExecutorRole && rolesId === Types.RolesId.observer) ? (
              <button
                onClick={() => {
                  dispatch(
                    RolesEffects.unassingRoles({
                      data: {
                        assign_user_id: el.id,
                        task_role_id: rolesId,
                      },
                      taskId,
                    }),
                  );
                }}
                className="modal_user_delite"
                type="button"
              >
                <CloseOutlined style={{ color: 'var(--color-grey600)' }} />
              </button>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </>
  );
};
