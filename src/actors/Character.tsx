import { useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { AnimationAction, Mesh } from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

type Props = {
  movementSpeed?: number;
  cameraMovementSpeed?: number;
  cameraOffset?: THREE.Vector3;
};

export type CharaterRef = {
  model: () => Mesh;
};

const Character = forwardRef<CharaterRef, Props>(function Character(
  props: Props,
  externalRef
) {
  // const audioRef = useRef(new Audio("audio/bgmusic.flac"));
  const bodyRef = useRef<RapierRigidBody>(null);
  const cameraPosition = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentAnimation = useRef<AnimationAction>();
  const gltf: GLTF = useLoader(GLTFLoader, "models/character.gltf");
  const { ref, actions, mixer } = useAnimations(gltf.animations);
  const [subscribeKey, getKeys] = useKeyboardControls();

  useImperativeHandle(externalRef, () => ({
    model: () => gltf.scene as any,
  }));

  useEffect(() => {
    actions.idle_loop.timeScale = 0.5;
    actions.idle_loop.play();
    currentAnimation.current = actions.idle_loop;

    subscribeKey(
      (state) => state.interact,
      (down) => {
        if (!down) {
          return;
        }
        // TODO: Here will fire ray trace
      }
    );
  }, []);

  useFrame(({ camera }, delta) => {
    cameraFollow(camera as THREE.PerspectiveCamera, delta);
    checkMovement(delta);
    checkForRespawn();
    mixer.update(delta);
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders={"cuboid"}
      gravityScale={1}
      lockRotations
    >
      <mesh ref={ref as any}>
        <primitive object={gltf.scene} />
      </mesh>
    </RigidBody>
  );

  function checkForRespawn() {
    if (bodyRef.current.translation().y < -3) {
      bodyRef.current.setTranslation({ x: 0, y: 0, z: 0 }, true);
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
    const { forward, backward, left, right } = getKeys();
    const xAxis = right ? 1 : left ? -1 : 0;
    const zAxis = forward ? -1 : backward ? 1 : 0;
    move(xAxis, zAxis, delta);
    rotate(xAxis, zAxis, delta);
  }

  function move(x: number, z: number, _: number) {
    if (x === 0 && z === 0) {
      fadeAnimation(actions.idle_loop);
      resetVelocity();
      return;
    }

    // if (audioRef.current.paused) {
    //   audioRef.current.loop = true;
    //   audioRef.current.volume = 0.45;
    //   audioRef.current.play();
    // }

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
      { x: 0, y: bodyRef.current.linvel().y, z: 0 },
      true
    );
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
    if (x === 0 && z === 0) {
      return;
    }
    const model = getModel();
    const currentQuaternion = model.children[0].quaternion
      .clone()
      .setFromEuler(model.children[0].rotation);
    currentQuaternion.x = 0;
    currentQuaternion.z = 0;

    const targetEuler = model.children[0].rotation.clone();
    targetEuler.x = 0;
    targetEuler.z = 0;
    targetEuler.y = THREE.MathUtils.degToRad(
      (Math.atan2(-z, x) * 180) / Math.PI + 90
    );
    const targetQuaternion = currentQuaternion
      .clone()
      .setFromEuler(targetEuler);
    const newQuaternion = currentQuaternion
      .clone()
      .slerp(targetQuaternion, 15 * delta);
    const newEuler = model.children[0].rotation
      .clone()
      .setFromQuaternion(newQuaternion);

    model.children[0].setRotationFromEuler(newEuler);
  }
});

Character.defaultProps = {
  movementSpeed: 1.5,
  cameraMovementSpeed: 1.3,
  cameraOffset: new THREE.Vector3(0, 2, 4),
};

export default Character;
