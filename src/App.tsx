import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Game } from "./Game";
import { InputsProvider } from "./InputsProvider";
import { DialogBox } from "./ui/dialog-box/DialogBox";

function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(60, 1.5, 0.1, 1000)
  );

  cameraRef.current.position.set(0, -1, 25);

  return (
    <div className="h-screen w-screen">
      <InputsProvider>
        <Canvas camera={cameraRef.current}>
          <Game />
        </Canvas>
      </InputsProvider>
      <DialogBox />
    </div>
  );
}

export default App;
