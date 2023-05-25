import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

type Props = {
  initialPositon: THREE.Vector3;
};

function Radio(props: Props) {
  const gltf: GLTF = useLoader(GLTFLoader, "models/radio/scene.gltf");
  return (
    <RigidBody position={props.initialPositon}>
      <rectAreaLight
        rotation={[0, THREE.MathUtils.degToRad(180), 0]}
        position={[0, 0.5, 0.1]}
        args={["orange", 10, 0.4, 2]}
      />
      <mesh scale={0.02}>
        <primitive object={gltf.scene} />
      </mesh>
    </RigidBody>
  );
}

Radio.defaultProps = {
  initialPositon: new THREE.Vector3(0, 0, 1),
} as Partial<Props>;

export default Radio;
