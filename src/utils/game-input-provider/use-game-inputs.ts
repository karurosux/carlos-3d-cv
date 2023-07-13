import {useContext} from 'react';
import {gameInputProvider} from './GameInputProvider';

export function useGameInputs() {
  const context = useContext(gameInputProvider);
  return context;
}
