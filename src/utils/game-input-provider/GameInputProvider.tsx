import {PropsWithChildren, createContext, useState} from 'react';
import {GameInput} from './models/game-input';

export const gameInputProvider = createContext<GameInput>(null);

export function GameInputProvider(props: PropsWithChildren) {
  const [gameInput] = useState<GameInput>({
    action: false,
    backward: false,
    forward: false,
    left: false,
    right: false,
  });

  return (
    <gameInputProvider.Provider value={gameInput}>
      {props.children}
    </gameInputProvider.Provider>
  );
}
