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
import Room from "./actors/Room";
import {
  GameStateBase,
  GameStateConstructor,
} from "./game-state/game-state-base";
import { GameStateContext } from "./game-state/game-state-context";
import { InitialState } from "./game-state/states/initial-state";

export function Game() {
  const characterRef = useRef<CharaterRef>(null);
  const [cameraOffset, setCameraOffset] = useState(new THREE.Vector3(0, 2, 3));
  const gameStateRef = useRef<GameStateBase>();
  const [subscribeKey, getKeys] = useKeyboardControls();

  useEffect(() => {
    internalSetState(InitialState);

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

  function internalSetState(clazz: GameStateConstructor) {
    gameStateRef?.current?.unmount?.();
    const newState = new clazz({
      character: characterRef.current,
      subscribeKey,
      getKeys,
      setCameraOffset,
      setGameState: internalSetState,
    } as GameStateContext);
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
          <Room />
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
