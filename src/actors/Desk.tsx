import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type Props = {
  initialPosition: THREE.Vector3;
};

function Desk(props: Props) {
  const linnon: GLTF = useLoader(GLTFLoader, "models/desk/linnon/scene.gltf");
  const stuff: GLTF = useLoader(GLTFLoader, "models/desk/stuff/scene.gltf");

  return (
    <group position={props.initialPosition}>
      <RigidBody type="fixed">
        <mesh scale={0.013}>
          <primitive object={linnon.scene} />
          <rectAreaLight
            position={[0, 110, 20]}
            rotation-x={THREE.MathUtils.degToRad(180)}
            args={["white", 25, 0.4, 0.3]}
          />
          <mesh
            position={[0, 78, 0.1]}
            rotation={[0, THREE.MathUtils.degToRad(-90), 0]}
            scale={1.6}
          >
            <primitive object={stuff.scene} />
          </mesh>
        </mesh>
      </RigidBody>
    </group>
  );
}

Desk.defaultProps = {
  initialPosition: new THREE.Vector3(0, 0, -3.1),
} as Partial<Props>;

export default Desk;
