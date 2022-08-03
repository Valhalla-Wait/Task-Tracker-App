import React from 'react';
import { countSubscribesSelectors, countSubscribesEffects } from 'store';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from 'shared';

const { EyeVisibleIcon } = Icons;

type EyeButtonProps = {
  taskID: string;
};

export const EyeButton: React.FC<EyeButtonProps> = (props) => {
  const { taskID } = props;
  const dispatch = useDispatch();

  const countSub = useSelector(countSubscribesSelectors.countSubscribesSelector);

  const arrCountSub = countSub.map((el) => el.relation_id);
  const objCountSub = countSub.map((el) => ({
    [el.relation_id]: el.subscribe_id,
  }));
  const getSubId = () => objCountSub.filter((el) => el[taskID])[0][taskID];

  const setSubscribe = () => {
    dispatch(
      countSubscribesEffects.subscribe({
        notifies: {
          web_hook: {
            url: 'http://domain.my/endpoint/:param',
            method: 'POST',
          },
          me: true,
        },
        relation_type: 'task',
        relation_id: taskID,
      }),
    );
  };

  const setUnSubscribe = () => {
    dispatch(countSubscribesEffects.deleteSubscribe(getSubId()));
  };

  return !arrCountSub.includes(taskID) ? (
    <button onClick={setSubscribe} className="modal_header_subscribes" type="button">
      <EyeInvisibleOutlined style={{ color: 'rgb(146, 146, 157)' }} />
    </button>
  ) : (
    <button onClick={setUnSubscribe} className="modal_header_subscribes" type="button">
      <EyeVisibleIcon />
    </button>
  );
};
