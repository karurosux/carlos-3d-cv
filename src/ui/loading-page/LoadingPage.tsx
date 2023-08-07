import {useProgress} from '@react-three/drei';
import {useEffect, useRef, useState} from 'react';
import classnNames from 'classnames';
import {AudioEffects} from '../../utils/audio-effects';

const TOTAL_OBJECTS = 23;
const COMPLETE_PERCENTAGE = 100;

export function LoadingPage() {
  const {loaded} = useProgress();
  const fadeOutTriggered = useRef(false);
  const [loadingBarVisible, setLoadingBarVisible] = useState(true);
  const [viewCompleted, setViewCompleted] = useState(false);

  useEffect(() => {
    if (loadingBarVisible) {
      return;
    }

    setTimeout(() => {
      setViewCompleted(true);
      AudioEffects.canPlay = true;
    }, 500);
  }, [loadingBarVisible]);

  const percentage = Math.round((loaded / TOTAL_OBJECTS) * 100);

  if (percentage === COMPLETE_PERCENTAGE && !fadeOutTriggered.current) {
    fadeOutTriggered.current = true;
    setTimeout(() => {
      setLoadingBarVisible(false);
    }, 1500);
  }

  if (viewCompleted) {
    // Nothing to show anymore.
    return;
  }

  return (
    <div
      className={classnNames([
        'fixed transition-opacity flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-black to-blue-950 text-white p-6 z-30',
        {
          'opacity-0': !loadingBarVisible,
          'opacity-100': loadingBarVisible,
        },
      ])}
    >
      <div className="w-1/3 p-4">
        <div className="mb-4 text-5xl text-center">{percentage}%</div>
        <div id="loading-bar" className="w-full h-4">
          <div
            className="h-full bg-white"
            style={{width: `${percentage}%`}}
          ></div>
        </div>
      </div>
    </div>
  );
}
