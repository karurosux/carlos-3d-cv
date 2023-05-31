import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Radio from "./Radio";
import * as THREE from "three";

function Room() {
  const gltf: GLTF = useLoader(GLTFLoader, "models/room.glb");
  gltf.scene.position.y = 0.2;

  return (
    <>
      <pointLight intensity={0.1} position={[1, 1, 0]} color="red" castShadow />
      <pointLight
        position={[-2, 0.3, -0.2]}
        color="blue"
        intensity={0.1}
        castShadow
      />
      <mesh receiveShadow rotation={[0, THREE.MathUtils.degToRad(-45), 0]}>
        <RigidBody
          type="fixed"
          lockRotations
          lockTranslations
          colliders={"trimesh"}
          gravityScale={0}
        >
          <primitive object={gltf.scene} />
        </RigidBody>
      </mesh>
      <Radio />
      <InvisileWall />
    </>
  );
}

function InvisileWall() {
  return <></>;
}

export default Room;
