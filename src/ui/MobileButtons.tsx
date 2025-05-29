import { useRef } from 'react';
import { isMobile } from '../utils/is-mobile';
import { useGameInputs } from '../utils/game-input-provider/use-game-inputs';

export function MobileButtons() {
  const { getInput } = useGameInputs();
  const gameInput = getInput();
  
  // Refs to track touch state
  const touchRefs = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    action: false,
  });

  if (!isMobile.any()) {
    return;
  }

  const handleTouchStart = (direction: keyof typeof touchRefs.current) => {
    if (touchRefs.current[direction]) return; // Prevent multiple triggers
    touchRefs.current[direction] = true;
    gameInput[direction] = true;
    
    // Simulate key press event to trigger subscribers
    const keyMap = {
      forward: 'KeyW',
      backward: 'KeyS', 
      left: 'KeyA',
      right: 'KeyD',
      action: 'Space'
    };
    
    const event = new KeyboardEvent('keydown', { code: keyMap[direction] });
    window.dispatchEvent(event);
  };

  const handleTouchEnd = (direction: keyof typeof touchRefs.current) => {
    if (!touchRefs.current[direction]) return; // Prevent multiple triggers
    touchRefs.current[direction] = false;
    gameInput[direction] = false;
    
    // Simulate key release event to trigger subscribers
    const keyMap = {
      forward: 'KeyW',
      backward: 'KeyS',
      left: 'KeyA', 
      right: 'KeyD',
      action: 'Space'
    };
    
    const event = new KeyboardEvent('keyup', { code: keyMap[direction] });
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed bottom-0 z-50">
      <div id="cross-buttons" className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8">
        <div className="relative flex w-24 h-24 sm:w-40 sm:h-40 p-2 sm:p-4 mt-2 sm:mt-4">
          {/* Up/Forward button */}
          <button
            type="button"
            className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[20px] sm:border-l-[25px] sm:border-r-[25px] sm:border-b-[35px] border-solid border-l-transparent border-r-transparent border-b-white bg-no-repeat bg-contain absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 select-none"
            onTouchStart={() => handleTouchStart('forward')}
            onTouchEnd={() => handleTouchEnd('forward')}
            onMouseDown={() => handleTouchStart('forward')}
            onMouseUp={() => handleTouchEnd('forward')}
            onMouseLeave={() => handleTouchEnd('forward')}
          />
          {/* Left button */}
          <button
            type="button"
            className="w-0 h-0 border-t-[15px] border-b-[15px] border-r-[20px] sm:border-t-[25px] sm:border-b-[25px] sm:border-r-[35px] border-solid border-t-transparent border-b-transparent border-r-white bg-no-repeat bg-contain absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 select-none"
            onTouchStart={() => handleTouchStart('left')}
            onTouchEnd={() => handleTouchEnd('left')}
            onMouseDown={() => handleTouchStart('left')}
            onMouseUp={() => handleTouchEnd('left')}
            onMouseLeave={() => handleTouchEnd('left')}
          />
          {/* Down/Backward button */}
          <button
            type="button"
            className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] sm:border-l-[25px] sm:border-r-[25px] sm:border-t-[35px] border-solid border-l-transparent border-r-transparent border-t-white bg-no-repeat bg-contain absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 select-none"
            onTouchStart={() => handleTouchStart('backward')}
            onTouchEnd={() => handleTouchEnd('backward')}
            onMouseDown={() => handleTouchStart('backward')}
            onMouseUp={() => handleTouchEnd('backward')}
            onMouseLeave={() => handleTouchEnd('backward')}
          />
          {/* Right button */}
          <button
            type="button"
            className="w-0 h-0 border-t-[15px] border-b-[15px] border-l-[20px] sm:border-t-[25px] sm:border-b-[25px] sm:border-l-[35px] border-solid border-t-transparent border-b-transparent border-l-white bg-no-repeat bg-contain absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 select-none"
            onTouchStart={() => handleTouchStart('right')}
            onTouchEnd={() => handleTouchEnd('right')}
            onMouseDown={() => handleTouchStart('right')}
            onMouseUp={() => handleTouchEnd('right')}
            onMouseLeave={() => handleTouchEnd('right')}
          />
        </div>
      </div>
      {/* Interact button */}
      <div className="fixed right-4 bottom-4 sm:right-8 sm:bottom-8">
        <div className="">
          <button 
            className="bg-white rounded-full w-16 h-16 sm:w-28 sm:h-28 select-none flex items-center justify-center text-black font-bold text-sm sm:text-lg"
            onTouchStart={() => handleTouchStart('action')}
            onTouchEnd={() => handleTouchEnd('action')}
            onMouseDown={() => handleTouchStart('action')}
            onMouseUp={() => handleTouchEnd('action')}
            onMouseLeave={() => handleTouchEnd('action')}
          >
            ⚡
          </button>
        </div>
      </div>
    </div>
  );
}
