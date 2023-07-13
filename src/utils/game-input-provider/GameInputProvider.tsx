import {PropsWithChildren, createContext, useEffect, useRef} from 'react';
import {GameInput} from './models/game-input';
import {GameInputContext} from './models/game-input-context';
import {KeySubscription} from './models/key-subscription';
import * as THREE from 'three';

export const gameInputProvider = createContext<GameInputContext>(null);

export function GameInputProvider(props: PropsWithChildren) {
  const gameInputRef = useRef<GameInput>({
    action: false,
    backward: false,
    forward: false,
    left: false,
    right: false,
  });
  const keySubscriptions = useRef<KeySubscription[]>([]);

  useEffect(() => {
    const keypressCallbackFactory = (val: boolean) => (evt: KeyboardEvent) => {
      console.log(evt);
      switch (evt.code) {
        case 'ArrowUp':
        case 'KeyW':
          gameInputRef.current.forward = val;
          break;

        case 'ArrowDown':
        case 'KeyS':
          gameInputRef.current.backward = val;
          break;

        case 'ArrowLeft':
        case 'KeyA':
          gameInputRef.current.left = val;
          break;

        case 'ArrowRight':
        case 'KeyD':
          gameInputRef.current.right = val;
          break;

        case 'Space':
          gameInputRef.current.action = val;
          break;
      }
    };

    const onKeyDown = (evt: KeyboardEvent) => {
      keypressCallbackFactory(true)(evt);
      keySubscriptions.current.forEach(
        (sub) => sub.valid(gameInputRef.current) && sub.callback()
      );
    };
    const onKeyUp = keypressCallbackFactory(false);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const gameInputContext: GameInputContext = {
    getInput: () => gameInputRef.current,
    subscribeKey: (valid, callback) => {
      const subscriptionId = THREE.MathUtils.generateUUID();
      keySubscriptions.current.push({
        id: subscriptionId,
        valid,
        callback,
      });

      return () => {
        const index = keySubscriptions.current.findIndex(
          (sub) => sub.id === subscriptionId
        );
        keySubscriptions.current.splice(index, 1);
      };
    },
  };

  return (
    <gameInputProvider.Provider value={gameInputContext}>
      {props.children}
    </gameInputProvider.Provider>
  );
}
