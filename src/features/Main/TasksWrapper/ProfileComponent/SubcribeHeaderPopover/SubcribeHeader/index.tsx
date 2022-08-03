import React from 'react';
import { Radio } from 'antd';
import { Icons } from 'shared';
import { useSelector } from 'react-redux';
import { subscribesSelectors } from 'store';

const { CloseIcon } = Icons;

type SubcribeHeaderProps = {
  countSubscrib: string;
  setCountSubscrib: React.Dispatch<React.SetStateAction<string>>;
  setActiveVisible: () => void;
};
export const SubcribeHeader: React.FC<SubcribeHeaderProps> = (props) => {
  const { countSubscrib, setCountSubscrib, setActiveVisible } = props;
  const item = useSelector(subscribesSelectors.subscribesSelector);

  const countNoReadSub = () => {
    if (item.filter((el) => el.viewed === false).length > 99) {
      return '99+';
    }
    return item.filter((el) => el.viewed === false).length;
  };
  return (
    <div className="subcribes_no_rite_wrap">
      <div className="subcribes_no_rite_box">
        <span className="subcribes_no_rite_count">Уведомления:</span>
        <span className="subcribes_no_rite">
          {countNoReadSub()}
        </span>
        <button className="subcribes_no_rite_btn" onClick={setActiveVisible} type="button">
          <CloseIcon />
        </button>
      </div>
      <Radio.Group
        defaultValue={countSubscrib}
        onChange={(e) => setCountSubscrib(e.target.value)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '18px 0px 17px 0',
          opacity: '0.6',
        }}
        size="small"
      >
        <Radio.Button
          style={{
            font: 'var(--paragraph-14_24-light) !important',
          }}
          value="all"
        >
          все
        </Radio.Button>
        <Radio.Button value="read">прочитанные</Radio.Button>
        <Radio.Button value="noread">непрочитанные</Radio.Button>
      </Radio.Group>
    </div>
  );
};
