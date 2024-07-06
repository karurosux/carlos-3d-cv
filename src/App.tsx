import {AdaptiveDpr, Preload} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {Game} from './Game';
import {MobileButtons} from './ui/MobileButtons';
import {DialogBox} from './ui/dialog-box/DialogBox';
import {InteractionText} from './ui/interaction-text/InteractionText';
import {LoadingPage} from './ui/loading-page/LoadingPage';
import {GameInputProvider} from './utils/game-input-provider/GameInputProvider';
import {ControlsOverlay} from './ui/controls-overlay/ControlsOverlay';
import {I18nextProvider} from 'react-i18next';
import {i18n} from './i18n';

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
          <DialogBox />
          <LoadingPage />
          <InteractionText />
          <MobileButtons />
          <ControlsOverlay />
        </GameInputProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
