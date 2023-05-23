import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import Character, { CharaterRef } from "./actors/Character";
import Room from "./actors/Room";
import { KeyboardControls } from "@react-three/drei";

function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(60, 1.5, 0.1, 1000)
  );
  const characterRef = useRef<CharaterRef>(null);

  return (
    <div className="h-screen w-screen">
      <KeyboardControls
        map={[
          { keys: ["w"], name: "forward" },
          { keys: ["s"], name: "backward" },
          { keys: ["a"], name: "left" },
          { keys: ["d"], name: "right" },
        ]}
      >
        <Canvas camera={cameraRef.current}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Character ref={characterRef} />
          <Room />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default App;
