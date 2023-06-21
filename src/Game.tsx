import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Character, { CharaterRef } from "./actors/Character";
import Room, { RoomRef } from "./actors/Room";
import {
  GameStateBase,
  GameStateConstructor,
} from "./game-state/game-state-base";
import { GameStateContext } from "./game-state/game-state-context";
import { ShowDialogState } from "./game-state/states/show-dialog-state";

export function Game() {
  const characterRef = useRef<CharaterRef>(null);
  const roomRef = useRef<RoomRef>(null);
  const [cameraOffset, setCameraOffset] = useState(new THREE.Vector3(0, 2, 3));
  const gameStateRef = useRef<GameStateBase>();
  const [subscribeKey, getKeys] = useKeyboardControls();

  useEffect(() => {
    internalSetState(ShowDialogState, [
      "Hey!",
      "Welcome to my personal website.",
      "My name is Carlos Gonzalez.",
      "Feel free to explore my space.",
    ]);

    return subscribeKey(
      (state) => state.interact,
      (down) => {
        if (!down) {
          return;
        }
        gameStateRef.current?.action?.();
      }
    );
  }, [gameStateRef]);

  useFrame((state, delta, frame) => {
    gameStateRef?.current?.frame?.(state, delta, frame);
  });

  function internalSetState(clazz: GameStateConstructor, data?: any) {
    gameStateRef?.current?.unmount?.();
    const newState = new clazz(
      {
        character: characterRef.current,
        room: roomRef.current,
        subscribeKey,
        getKeys,
        setCameraOffset,
        setGameState: internalSetState,
      } as GameStateContext,
      data
    );
    newState.init?.();
    gameStateRef.current = newState;
  }

  return (
    <>
      <color attach="background" args={["#2e1357"]} />
      <ambientLight color="#b69cff" intensity={0.08} />
      <Physics>
        <Suspense fallback={null}>
          <Character ref={characterRef} cameraOffset={cameraOffset} />
          <Room ref={roomRef} />
        </Suspense>
      </Physics>
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={1.6} height={300} />
        <ChromaticAberration
          radialModulation={true}
          modulationOffset={0.4}
          offset={new THREE.Vector2(0.005, 0.005)}
        />
      </EffectComposer>
    </>
  );
}
