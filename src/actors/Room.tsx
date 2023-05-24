import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Room() {
  const gltf: GLTF = useLoader(GLTFLoader, "CVRoom.gltf");
  gltf.scene.position.y = 0.2;

  return (
    <>
      <pointLight position={[1, 1, 0]} color="red" castShadow />
      <pointLight
        position={[-2, 0.3, -0.2]}
        color="blue"
        intensity={3}
        castShadow
      />
      <mesh>
        <RigidBody lockRotations lockTranslations colliders={"trimesh"} gravityScale={0}>
          <primitive object={gltf.scene} />
        </RigidBody>
      </mesh>
    </>
  );
}

export default Room;
