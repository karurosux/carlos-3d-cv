import classNames from 'classnames';
import {useEffect, useRef, useState} from 'react';
import {RiArrowDropDownFill, RiSpace} from 'react-icons/ri';
import {Typewritter} from '../../utils/typewritter-effect';
import {DialogBoxController} from './DialogBoxController';

export function DialogBox() {
  const divRef = useRef<HTMLDivElement>(null);
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
  const [textLines, setTextLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const typewritterRef = useRef(
    new Typewritter((txt) => {
      divRef.current.innerHTML = txt;
    })
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [textLines]);

  useEffect(() => {
    const currentTextLine = textLines?.[currentIndex];
    if (currentTextLine) {
      typewritterRef.current.type(currentTextLine);
      if (!dialogBoxVisible) {
        // If its not visible, make it
        setDialogBoxVisible(true);
      }
    }
  }, [currentIndex, textLines]);

  DialogBoxController.setTextLines = setTextLines;
  DialogBoxController.nextLine = next;

  function next() {
    if (typewritterRef.current.isTyping) {
      // no continue if typing.
      typewritterRef.current.skip();
      return;
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= textLines.length) {
      setTextLines([]);
      typewritterRef.current.clear();
      setDialogBoxVisible(false);
      DialogBoxController.onAfterLastLine?.();
      return;
    }

    setCurrentIndex(nextIndex);
  }

  return (
    <>
      <div className="fixed flex justify-center w-full bottom-24">
        <div
          id="dialog-box"
          className={classNames(
            [{hidden: !dialogBoxVisible}],
            'relative z-10 p-8 text-white bg-black w-full max-w-[1200px] border-white select-none mx-10 opacity-60 h-96 border-8 text-7xl'
          )}
        >
          <div ref={divRef} />
          <RiArrowDropDownFill className="absolute z-20 text-white bottom-1 right-2 text-8xl animate-pulse animate-bounce" />
        </div>
      </div>
      {dialogBoxVisible && (
        <>
          <div className="fixed z-20 flex justify-center w-full sm:bottom-2 lg:bottom-10">
            <p className="flex text-white uppercase sm:text-xs lg:text-3xl break-keep whitespace-nowrap animate-pulse">
              Press&nbsp;
              <RiSpace className="mt-2" />
              &nbsp;to continue
            </p>
          </div>
        </>
      )}
    </>
  );
}
