import {useFrame, useLoader} from '@react-three/fiber';
import {RapierRigidBody, RigidBody} from '@react-three/rapier';
import {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import Sound from '../utils/Sound';
import {RESPAWN_THRESHOLD} from '../constants';
import {useGameInputs} from '../utils/game-input-provider/use-game-inputs';

type Props = {
  initialPositon: THREE.Vector3;
};

function Radio(props: Props) {
  const gltf: GLTF = useLoader(GLTFLoader, 'models/radio/scene.gltf');
  const audioRef = useRef<THREE.PositionalAudio>(null);
  const bodyRef = useRef<RapierRigidBody>(null);
  const {subscribeKey} = useGameInputs();

  useFrame(() => {
    if (bodyRef.current?.translation?.()?.y < RESPAWN_THRESHOLD) {
      bodyRef.current?.setRotation({w: 1, x: 0, y: 0, z: 0}, true);
      bodyRef.current.setTranslation(
        {
          x: props.initialPositon.x,
          y: props.initialPositon.y,
          z: props.initialPositon.z,
        },
        true
      );
    }
  });

  useEffect(() => {
    const unsubscribe = subscribeKey(
      (input) =>
        input.forward ||
        input.backward ||
        input.left ||
        input.right ||
        input.action,
      () => {
        if (audioRef.current && !audioRef.current?.isPlaying) {
          audioRef.current.setVolume(0.8);
          audioRef.current.setLoop(true);
          audioRef.current.play();
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [audioRef]);

  return (
    <RigidBody ref={bodyRef} name="radio" position={props.initialPositon}>
      <rectAreaLight
        rotation={[0, THREE.MathUtils.degToRad(180), 0]}
        position={[0, 0.2, 0.1]}
        args={['orange', 25, 0.4, 0.3]}
      />
      <Sound ref={audioRef} url="audio/bgmusic.flac" />
      <mesh scale={0.02}>
        <primitive object={gltf.scene} />
      </mesh>
    </RigidBody>
  );
}

Radio.defaultProps = {
  initialPositon: new THREE.Vector3(1, 0, 0),
} as Partial<Props>;

export default Radio;
