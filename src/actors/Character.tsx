import {useAnimations, useKeyboardControls} from '@react-three/drei';
import {useFrame, useLoader} from '@react-three/fiber';
import {
  CapsuleCollider,
  CuboidCollider,
  IntersectionEnterPayload,
  IntersectionExitPayload,
  RapierRigidBody,
  RigidBody,
  quat,
} from '@react-three/rapier';
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import * as THREE from 'three';
import {AnimationAction, Mesh} from 'three';
import {GLTF, GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RESPAWN_THRESHOLD} from '../constants';

type Props = {
  movementSpeed?: number;
  cameraMovementSpeed?: number;
  cameraOffset?: THREE.Vector3;
};

export type CharaterRef = {
  model: () => THREE.Group;
  checkMovement: (delta: number) => void;
  startIdleAnim: () => void;
  colliding: () => THREE.Object3D;
};

const Character = forwardRef<CharaterRef, Props>(function Character(
  props: Props,
  externalRef
) {
  const bodyRef = useRef<RapierRigidBody>(null);
  const cameraPosition = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentAnimation = useRef<AnimationAction>();
  const collidingRef = useRef<THREE.Object3D>();
  const gltf: GLTF = useLoader(GLTFLoader, 'models/character.gltf');
  const {ref, actions, mixer} = useAnimations(gltf.animations);
  const [_, getKeys] = useKeyboardControls();

  useImperativeHandle(externalRef, () => ({
    model: () => gltf.scene,
    colliding: () => collidingRef.current,
    checkMovement,
    startIdleAnim,
  }));

  useEffect(() => {
    actions.idle_loop.timeScale = 0.5;
    actions.idle_loop.play();
    currentAnimation.current = actions.idle_loop;
  }, []);

  useFrame(({camera}, delta) => {
    cameraFollow(camera as THREE.PerspectiveCamera, delta);
    checkForRespawn();
    mixer.update(delta);
  });

  function checkForRespawn() {
    if (bodyRef.current?.translation?.()?.y < RESPAWN_THRESHOLD) {
      bodyRef.current.setTranslation({x: 0, y: 0, z: 0}, true);
    }
  }

  function cameraFollow(camera: THREE.PerspectiveCamera, delta: number) {
    const position = getModel().position.clone();
    getModel().getWorldPosition(position);
    cameraPosition.current.copy(position.clone().add(props.cameraOffset));
    camera.position.lerp(
      cameraPosition.current,
      props.cameraMovementSpeed * delta
    );
    camera.lookAt(position);
    camera.rotation.y = 0;
    camera.rotation.z = 0;
  }

  function checkMovement(delta: number) {
    const {forward, backward, left, right} = getKeys();
    const xAxis = right ? 1 : left ? -1 : 0;
    const zAxis = forward ? -1 : backward ? 1 : 0;
    move(xAxis, zAxis, delta);
    rotate(xAxis, zAxis, delta);
  }

  function move(x: number, z: number, _: number) {
    if (x === 0 && z === 0) {
      startIdleAnim();
      resetVelocity();
      return;
    }

    bodyRef.current.setLinvel(
      {
        x: x * props.movementSpeed,
        y: bodyRef.current.linvel().y,
        z: z * props.movementSpeed,
      },
      true
    );
    fadeAnimation(actions.walk_loop);
  }

  function resetVelocity() {
    bodyRef.current.setLinvel(
      {x: 0, y: bodyRef.current.linvel().y, z: 0},
      true
    );
  }

  function startIdleAnim() {
    fadeAnimation(actions.idle_loop);
  }

  function getModel() {
    return ref.current as any as Mesh;
  }

  function fadeAnimation(next: AnimationAction) {
    if (next.isRunning()) {
      return;
    }
    currentAnimation.current?.fadeOut(0.2);
    currentAnimation.current = next;
    next
      .reset()
      .setEffectiveTimeScale(0.6)
      .setEffectiveWeight(1)
      .fadeIn(0.2)
      .play();
  }

  function rotate(x: number, z: number, delta: number) {
    if ((x === 0 && z === 0) || !bodyRef.current) {
      return;
    }
    const targetYaw = THREE.MathUtils.degToRad(
      (Math.atan2(-z, x) * 180) / Math.PI + 90
    );
    const currentQuat = quat(bodyRef.current.rotation());
    const targetQuat = quat(bodyRef.current.rotation());
    targetQuat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), targetYaw);
    const newQuat = currentQuat.clone().slerp(targetQuat, 15 * delta);

    bodyRef.current.setRotation(
      {
        x: newQuat.x,
        y: newQuat.y,
        z: newQuat.z,
        w: newQuat.w,
      },
      true
    );
  }

  function handleIntersectionEnter(payload: IntersectionEnterPayload) {
    collidingRef.current = payload.colliderObject;
  }

  function handleIntersectionExit(_: IntersectionExitPayload) {
    collidingRef.current = null;
  }

  return (
    <>
      <RigidBody ref={bodyRef} colliders={false} gravityScale={1} lockRotations>
        <CapsuleCollider args={[0.5, 0.4]} position={[0, 0.8, 0]} />
        <mesh ref={ref as any}>
          <primitive object={gltf.scene} />
        </mesh>
        <CuboidCollider
          sensor
          name="character-interactor"
          args={[0.2, 0.6, 0.1]}
          position={[0, 0.6, 0.5]}
          onIntersectionEnter={handleIntersectionEnter}
          onCollisionExit={handleIntersectionExit}
        />
      </RigidBody>
    </>
  );
});

Character.defaultProps = {
  movementSpeed: 1.5,
  cameraMovementSpeed: 1.3,
  cameraOffset: new THREE.Vector3(0, 6, 10),
};

export default Character;
