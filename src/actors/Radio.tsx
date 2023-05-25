import { useKeyboardControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Sound from "../utils/Sound";

type Props = {
  initialPositon: THREE.Vector3;
};

function Radio(props: Props) {
  const gltf: GLTF = useLoader(GLTFLoader, "models/radio/scene.gltf");
  const audioRef = useRef<THREE.PositionalAudio>(null);
  const [subscribeKey] = useKeyboardControls();

  useEffect(
    () =>
      subscribeKey(
        (state) =>
          state.forward ||
          state.backward ||
          state.left ||
          state.right ||
          state.interact,
        (up) => {
          if (up && audioRef.current && !audioRef.current?.isPlaying) {
            audioRef.current.setLoop(true);
            audioRef.current.play();
          }
        }
      ),
    [audioRef]
  );

  return (
    <RigidBody position={props.initialPositon}>
      <rectAreaLight
        rotation={[0, THREE.MathUtils.degToRad(180), 0]}
        position={[0, 0.2, 0.1]}
        args={["orange", 15, 0.4, 0.3]}
      />
      <Sound ref={audioRef} url="audio/bgmusic.flac" />
      <mesh scale={0.02}>
        <primitive object={gltf.scene} />
      </mesh>
    </RigidBody>
  );
}

Radio.defaultProps = {
  initialPositon: new THREE.Vector3(0, 0, -2),
} as Partial<Props>;

export default Radio;
