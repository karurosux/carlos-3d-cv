import {MeshPhysicalMaterialProps, useLoader} from '@react-three/fiber';
import {CuboidCollider, CylinderCollider} from '@react-three/rapier';
import {kebabCase} from 'lodash';
import {forwardRef, useImperativeHandle, useRef} from 'react';
import * as THREE from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {ROOM_LAMP_INTENSITY} from '../constants';
import {ComputerMenu} from '../ui/computer-menu/ComputerMenu';
import {AudioEffects} from '../utils/audio-effects';
import Radio from './Radio';

export type RoomRef = {
  toggleLight: () => void;
  findRoomObject: (name: string) => THREE.Object3D;
};

const Room = forwardRef(function (_, ref) {
  const lightRef = useRef<THREE.PointLight>(null);
  const gltf: GLTF = useLoader(GLTFLoader, 'models/room.glb');

  useImperativeHandle(ref, () => ({
    toggleLight,
    findRoomObject,
  }));

  function findRoomObject(name: string) {
    let result: THREE.Object3D;
    gltf.scene.traverse((obj: THREE.Object3D) => {
      if (kebabCase(obj.name) === kebabCase(name)) {
        result = obj;
      }
    });
    return result;
  }

  function toggleLight() {
    const isOff = lightRef.current.intensity === 0;
    gltf.scene.traverse((obj) => {
      if (kebabCase(obj.name) === 'lamp-cover') {
        const mesh = obj as THREE.Mesh;
        const material = mesh.material as MeshPhysicalMaterialProps;
        material.emissiveIntensity = isOff ? 10 : 0;
      }
    });
    lightRef.current.intensity = isOff ? ROOM_LAMP_INTENSITY : 0;
    AudioEffects.play('switch');
  }

  // Set properties here
  gltf.scene.position.y = 0.2;

  return (
    <>
      <pointLight
        ref={lightRef}
        intensity={ROOM_LAMP_INTENSITY}
        position={[0, 1, -2.6]}
        distance={8}
        color="orange"
      />
      <mesh rotation={[0, THREE.MathUtils.degToRad(-45), 0]}>
        <primitive object={gltf.scene} />
        <mesh
          name="computer-content"
          position={[-1.85, 0.48, 1.115]}
          rotation={[0, THREE.MathUtils.degToRad(90), 0]}
        >
          <rectAreaLight
            args={['#64affa', 30, 1, 1]}
            position={[0, 0, -0.1]}
            rotation={[0, THREE.MathUtils.degToRad(180), 0]}
          />
          <ComputerMenu />
        </mesh>
      </mesh>
      <Radio />
      <CuboidCollider
        name="floor-collider"
        args={[2.7, 0.6, 2.7]}
        position={[0, -1.6, 0]}
        rotation={[0, THREE.MathUtils.degToRad(45), 0]}
      />
      <CuboidCollider
        name="right-wall-collider"
        args={[3, 2, 0.2]}
        position={[1.8, 0, -1.8]}
        rotation={[0, THREE.MathUtils.degToRad(-45), 0]}
      />
      <CuboidCollider
        name="left-wall-collider"
        args={[3, 2, 0.2]}
        position={[-1.8, 0, -1.8]}
        rotation={[0, THREE.MathUtils.degToRad(45), 0]}
      />
      <CuboidCollider
        name="desktop-collider"
        args={[1, 0.8, 1.25]}
        position={[-2.2, -0.2, -0.6]}
        rotation={[0, THREE.MathUtils.degToRad(45), 0]}
      />
      <CuboidCollider
        name="lamp-collider"
        args={[0.3, 1, 0.3]}
        position={[0.1, 0, -2.7]}
        rotation={[0, THREE.MathUtils.degToRad(45), 0]}
      />
      <CuboidCollider
        name="shelve-collider"
        args={[0.5, 0.6, 1.1]}
        position={[1.4, -0.4, -1.4]}
        rotation={[0, THREE.MathUtils.degToRad(45), 0]}
      />
      <CylinderCollider
        name="thrash-collider"
        args={[0.3, 0.3]}
        position={[2.7, -0.7, -0.2]}
      />
    </>
  );
});

export default Room;
