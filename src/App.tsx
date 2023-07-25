import {AdaptiveDpr, Preload} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import {useRef} from 'react';
import * as THREE from 'three';
import {Game} from './Game';
import {MobileButtons} from './ui/MobileButtons';
import {DialogBox} from './ui/dialog-box/DialogBox';
import {InteractionText} from './ui/interaction-text/InteractionText';
import {LoadingPage} from './ui/loading-page/LoadingPage';
import {GameInputProvider} from './utils/game-input-provider/GameInputProvider';

function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(60, 1.5, 0.1, 1000)
  );

  cameraRef.current.position.set(0, 0.5, -10);

  return (
    <div className="w-screen h-screen">
      <GameInputProvider>
        <Canvas camera={cameraRef.current}>
          <Game />
          <Preload all />
          <AdaptiveDpr pixelated />
          {/* <Environment preset="warehouse" /> */}
        </Canvas>
        <DialogBox />
        <LoadingPage />
        <InteractionText />
        {/* <ComputerMenu /> */}
        <MobileButtons />
      </GameInputProvider>
    </div>
  );
}

export default App;
