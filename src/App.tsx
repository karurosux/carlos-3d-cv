import {Canvas} from '@react-three/fiber';
import {useRef} from 'react';
import * as THREE from 'three';
import {Game} from './Game';
import {InputsProvider} from './InputsProvider';
import {DialogBox} from './ui/dialog-box/DialogBox';
import {LoadingPage} from './ui/loading-page/LoadingPage';
import {InteractionText} from './ui/interaction-text/InteractionText';
import {MobileButtons} from './ui/MobileButtons';
import {AdaptiveDpr, Preload} from '@react-three/drei';

function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(60, 1.5, 0.1, 1000)
  );

  cameraRef.current.position.set(0, 0.5, -10);

  return (
    <div className="w-screen h-screen">
      <InputsProvider>
        <Canvas camera={cameraRef.current}>
          <Game />
          <Preload all />
          <AdaptiveDpr pixelated />
        </Canvas>
      </InputsProvider>
      <DialogBox />
      <LoadingPage />
      <InteractionText />
      <MobileButtons />
    </div>
  );
}

export default App;
