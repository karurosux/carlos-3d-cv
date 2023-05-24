import { Environment, KeyboardControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";
import Character, { CharaterRef } from "./actors/Character";
import Room from "./actors/Room";

function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(60, 1.5, 0.1, 1000)
  );
  const characterRef = useRef<CharaterRef>(null);

  return (
    <>
      <div className="h-screen w-screen">
        <KeyboardControls
          map={[
            { keys: ["w", "ArrowUp"], name: "forward" },
            { keys: ["s", "ArrowDown"], name: "backward" },
            { keys: ["a", "ArrowLeft"], name: "left" },
            { keys: ["d", "ArrowRight"], name: "right" },
            { keys: ["Space"], name: "interact" },
          ]}
        >
          <Canvas camera={cameraRef.current}>
            <fog attach="fog" args={["white", 0, 500]} />
            <Sky sunPosition={[100, 10, 100]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Physics>
              <Character ref={characterRef} />
              <Room />
            </Physics>
            <Environment preset="night" />
          </Canvas>
        </KeyboardControls>
      </div>
    </>
  );
}

export default App;
