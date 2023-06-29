import {MeshPhysicalMaterialProps, useLoader} from '@react-three/fiber';
import {CuboidCollider, CylinderCollider} from '@react-three/rapier';
import {kebabCase} from 'lodash';
import {
  Suspense,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import * as THREE from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import Radio from './Radio';
import {useVideoTexture} from '@react-three/drei';
import {AudioEffects} from '../utils/audio-effects';

export type RoomRef = {
  toggleLight: () => void;
};

const meshUpdateMap: Record<string, (mesh: THREE.Mesh) => void> = {
  'lamp-cover': (cover) => {
    const material = cover.material as MeshPhysicalMaterialProps;
    material.emissive = new THREE.Color('#ffffff');
    material.emissiveIntensity = 10;
  },
  wall: (wall) => {
    const material = wall.material as MeshPhysicalMaterialProps;
    material.roughness = 1;
  },
  door: (door) => {
    const material = door.material as MeshPhysicalMaterialProps;
    material.roughness = 1;
  },
  floor: (floor) => {
    const material = floor.material as MeshPhysicalMaterialProps;
    material.roughness = 0.1;
    material.specularIntensity = 0.5;
    material.clearcoat = 1;
    material.clearcoatRoughness = 0;
  },
  'thrash-pin': (thrash) => {
    const material = thrash.material as MeshPhysicalMaterialProps;
    material.metalness = 0.7;
    material.roughness = 0.3;
  },
  window: (wdw) => {
    const material = wdw.material as MeshPhysicalMaterialProps;
    material.roughness = 0.1;
  },
  shelve: (shelve) => {
    const material = shelve.material as MeshPhysicalMaterialProps;
    material.roughness = 0.7;
  },
};

const Room = forwardRef(function (_, ref) {
  const lightRef = useRef<THREE.PointLight>(null);
  const gltf: GLTF = useLoader(GLTFLoader, 'models/room.glb');
  const videoTexture = useVideoTexture('video/code.mp4');

  useImperativeHandle(ref, () => ({
    toggleLight,
  }));

  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj.type === 'Mesh') {
        const mesh = obj as THREE.Mesh;
        const name = kebabCase(obj.name);
        const updateFunction = meshUpdateMap[name];
        if (updateFunction) {
          updateFunction(mesh);
        }
      }
    });
  }, []);

  function toggleLight() {
    const isOff = lightRef.current.intensity === 0;
    gltf.scene.traverse((obj) => {
      if (kebabCase(obj.name) === 'lamp-cover') {
        const mesh = obj as THREE.Mesh;
        const material = mesh.material as MeshPhysicalMaterialProps;
        material.emissiveIntensity = isOff ? 10 : 0;
      }
    });
    lightRef.current.intensity = isOff ? 0.4 : 0;
    AudioEffects.play('switch');
  }

  // Set properties here
  gltf.scene.position.y = 0.2;

  return (
    <>
      <pointLight
        ref={lightRef}
        intensity={0.4}
        position={[0, 1, -2.6]}
        distance={8}
        color="orange"
      />
      <pointLight
        position={[-2, 1, 0]}
        distance={5}
        color="blue"
        intensity={1}
      />
      <pointLight
        position={[1.7, 0.2, -1.7]}
        distance={6}
        color="purple"
        intensity={5}
      />
      <mesh
        rotation={[0, THREE.MathUtils.degToRad(-45), 0]}
      >
        <primitive object={gltf.scene} />
        <mesh name="code-video">
          <mesh
            position={[-1.85, 0.5, 1.15]}
            rotation={[0, THREE.MathUtils.degToRad(90), 0]}
          >
            <planeGeometry args={[1.1, 0.6]} />
            <Suspense fallback={<meshBasicMaterial />}>
              <meshBasicMaterial map={videoTexture} toneMapped={false} />
            </Suspense>
            <rectAreaLight
              args={['white', 0.5, 0.5, 2]}
              position={[0, 0, 0.8]}
              rotation={[THREE.MathUtils.degToRad(-140), 0, 0]}
            />
          </mesh>
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
