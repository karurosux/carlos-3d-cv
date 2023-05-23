import { useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Room() {
  const gltf: GLTF = useLoader(GLTFLoader, "CVRoom.gltf");

  gltf.scene.position.y = 0.2;

  return (
    <mesh>
      <pointLight position={[-2, 0.3, -0.2]} color="blue" intensity={3} castShadow />
      <pointLight position={[1, 1, 0]} color="red" castShadow />
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export default Room;
