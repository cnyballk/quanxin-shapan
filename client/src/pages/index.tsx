import './index.less';

import React, { useEffect, useState } from 'react';

import SceneSwitch, { type SceneMode } from '@/components/SceneSwitch';

export default function HomePage() {
  const [sceneMode, setSceneMode] = useState<SceneMode>('day');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('scene_mode');
      if (raw === 'day' || raw === 'night') setSceneMode(raw);
    } catch {
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('scene_mode', sceneMode);
    } catch {
    }
  }, [sceneMode]);

  return (
    <div className="home-page">
      <div className="tools">
        <SceneSwitch value={sceneMode} onChange={setSceneMode} />
      </div>
    </div>
  );
}
