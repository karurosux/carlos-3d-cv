import {AdaptiveDpr, Preload} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import {useEffect, useRef, lazy, Suspense} from 'react';
import * as THREE from 'three';
import {Game} from './Game';
import {MobileButtons} from './ui/MobileButtons';
import {GameInputProvider} from './utils/game-input-provider/GameInputProvider';
import {I18nextProvider} from 'react-i18next';
import {i18n} from './i18n';

// Lazy load components
const DialogBox = lazy(() =>
  import('./ui/dialog-box/DialogBox').then((module) => ({
    default: module.DialogBox,
  }))
);
const InteractionText = lazy(() =>
  import('./ui/interaction-text/InteractionText').then((module) => ({
    default: module.InteractionText,
  }))
);
const LoadingPage = lazy(() =>
  import('./ui/loading-page/LoadingPage').then((module) => ({
    default: module.LoadingPage,
  }))
);
const ControlsOverlay = lazy(() =>
  import('./ui/controls-overlay/ControlsOverlay').then((module) => ({
    default: module.ControlsOverlay,
  }))
);
const ShareMenu = lazy(() =>
  import('./ui/share-menu/ShareMenu').then((module) => ({
    default: module.ShareMenu,
  }))
);
const PerformanceOverlay = lazy(() =>
  import('./ui/performance-overlay/PerformanceOverlay').then((module) => ({
    default: module.PerformanceOverlay,
  }))
);

function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(60, 1.5, 0.1, 1000)
  );

  useEffect(() => {
    cameraRef.current.position.set(0, 0.5, -8);
  }, [cameraRef]);

  return (
    <div className="w-screen h-screen">
      <I18nextProvider i18n={i18n}>
        <GameInputProvider>
          <Canvas camera={cameraRef.current}>
            <Game />
            <Preload all />
            <AdaptiveDpr pixelated />
          </Canvas>
          <Suspense fallback={null}>
            <DialogBox />
            <LoadingPage />
            <InteractionText />
            <ControlsOverlay />
            <ShareMenu />
            <PerformanceOverlay />
          </Suspense>
          <MobileButtons />
        </GameInputProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
