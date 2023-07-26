import {Environment} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {Physics} from '@react-three/rapier';
import {Suspense, useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import Character, {CharaterRef} from './actors/Character';
import Room, {RoomRef} from './actors/Room';
import {GameStateBase} from './game-state/game-state-base';
import {GameStateConstructor} from './game-state/game-state-constructor';
import {GameStateContext} from './game-state/game-state-context';
import {ShowDialogState} from './game-state/states/show-dialog-state';
import {AudioEffects} from './utils/audio-effects';
import {useGameInputs} from './utils/game-input-provider/use-game-inputs';

export function Game() {
  const characterRef = useRef<CharaterRef>(null);
  const roomRef = useRef<RoomRef>(null);
  const [cameraOffset, setCameraOffset] = useState(new THREE.Vector3(0, 2, 3));
  const gameStateRef = useRef<GameStateBase>();
  const {getInput, subscribeKey} = useGameInputs();

  useEffect(() => {
    internalSetState(ShowDialogState, [
      'Hey!',
      'Welcome to my personal website.',
      'My name is Carlos Gonzalez.',
      'Feel free to explore my space.',
    ]);

    AudioEffects.initializeAudios();

    const unsubscribe = subscribeKey(
      (state) => state.action,
      () => {
        gameStateRef.current?.action?.();
      }
    );

    return () => {
      unsubscribe();
    };
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
        getKeys: getInput,
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
      <color attach="background" args={['#2e1357']} />
      {/* <ambientLight color="#b69cff" intensity={0.03} /> */}
      <Environment background={false} preset="night" />
      <Physics>
        <Suspense fallback={null}>
          <Character ref={characterRef} cameraOffset={cameraOffset} />
          <Room ref={roomRef} />
        </Suspense>
      </Physics>
    </>
  );
}
