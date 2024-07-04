import {Environment, Stars} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
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
import {UserData} from './constants/user';
import {PPUtils} from './utils/pp-util';

export function Game() {
  const characterRef = useRef<CharaterRef>(null);
  const roomRef = useRef<RoomRef>(null);
  const [cameraOffset, setCameraOffset] = useState(new THREE.Vector3(0, 2, 3));
  const gameStateRef = useRef<GameStateBase>();
  const {getInput, subscribeKey} = useGameInputs();

  useEffect(() => {
    internalSetState(ShowDialogState, [
      'introDialog.line1',
      'introDialog.line2',
      {
        key: 'introDialog.line3',
        context: {firstName: UserData.firstName, lastName: UserData.lastName},
      },
      'introDialog.line4',
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

  const postProcessingEnabled = PPUtils.hasPP();

  return (
    <>
      <color attach="background" args={['black']} />
      <ambientLight color="#b69cff" intensity={0.3} />
      <Environment preset="night" />
      <Physics>
        <Suspense fallback={null}>
          <Character ref={characterRef} cameraOffset={cameraOffset} />
          <Room ref={roomRef} />
          <Stars />
        </Suspense>
      </Physics>
      {postProcessingEnabled && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            height={100}
          />
          <Noise opacity={0.2} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0008, 0.0008)}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      )}
    </>
  );
}
