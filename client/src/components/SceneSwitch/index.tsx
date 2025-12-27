import classNames from 'classnames';
import './index.less';

import React, { useCallback, useMemo, useState } from 'react';

export type SceneMode = 'day' | 'night';

export interface SceneSwitchProps {
  value?: SceneMode;
  defaultValue?: SceneMode;
  onChange?: (next: SceneMode) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  dayText?: string;
  nightText?: string;
}

export default function SceneSwitch(props: SceneSwitchProps) {
  const {
    value,
    defaultValue = 'day',
    onChange,
    disabled = false,
    className,
    style,
    dayText = '日景',
    nightText = '夜景',
  } = props;

  const [inner, setInner] = useState<SceneMode>(defaultValue);
  const mode = value ?? inner;

  const nextMode = useMemo<SceneMode>(() => (mode === 'day' ? 'night' : 'day'), [mode]);

  const setMode = useCallback(
    (next: SceneMode) => {
      if (disabled) return;
      if (value == null) setInner(next);
      onChange?.(next);
    },
    [disabled, onChange, value],
  );

  const onToggle = useCallback(() => setMode(nextMode), [nextMode, setMode]);

  const label = mode === 'day' ? dayText : nightText;
  const iconSrc = mode === 'day' ? '/img/icon-rijing.png' : '/img/icon-yejing.png';

  return (
    <div
      className={classNames('scene-switch', `scene-switch--${mode}`, disabled ? 'is-disabled' : '', className ?? '')}
      style={style}
      onClick={onToggle}
    >
      <div className="scene-switch__left" aria-hidden="true">
        <div className="scene-switch__knob">
          <img className="scene-switch__icon" src={iconSrc} alt="" />
        </div>
      </div>
      <span className="scene-switch__text">{label}</span>
    </div>
  );
}


