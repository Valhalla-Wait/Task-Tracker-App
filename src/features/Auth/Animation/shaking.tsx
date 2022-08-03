import React from 'react';
import TweenOne, { Plugins } from 'rc-tween-one';
import PathMotionPlugin from 'rc-tween-one/es/plugin/PathMotionPlugin';

type ShakingProps = { isAnimating: boolean; onLoopComplete: () => void };

export const Shaking: React.FC<ShakingProps> = (props) => {
  const { children, isAnimating, onLoopComplete } = props;

  Plugins.push(PathMotionPlugin);

  return (
    <TweenOne
      animation={{
        yoyo: true,
        repeat: 0,
        PathMotion: { path: 'M0,0h3h-6h6h-6h6h-6Z', rotate: false, center: ['0px', '0px'] },
        duration: 1000,
        onRepeat: onLoopComplete,
      }}
      paused={!isAnimating}
    >
      {children}
    </TweenOne>
  );
};
