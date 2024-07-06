import classNames from 'classnames';
import {useEffect, useRef, useState} from 'react';
import {RiArrowDropDownFill, RiSpace} from 'react-icons/ri';
import {TypewritterEffect} from '../../utils/typewritter-effect';
import {DialogBoxController} from './dialog-box-controller';
import {AudioEffects} from '../../utils/audio-effects';
import {useTranslation} from 'react-i18next';
import {InteractableDialogAction} from '../../interactable-map';

export function DialogBox() {
  const {t} = useTranslation();
  const divRef = useRef<HTMLDivElement>(null);
  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
  const [textLines, setTextLines] = useState<InteractableDialogAction['lines']>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const typewritterRef = useRef(
    new TypewritterEffect((txt) => {
      divRef.current.innerHTML = txt;
    })
  );

  useEffect(() => {
    AudioEffects.play('keycap');
    setCurrentIndex(0);
  }, [textLines]);

  useEffect(() => {
    const interactableKey = textLines?.[currentIndex];

    if (!interactableKey) {
      return;
    }

    const currentTextLine =
      typeof interactableKey === 'string'
        ? t(interactableKey)
        : t(interactableKey.key, interactableKey.context);

    if (currentTextLine) {
      typewritterRef.current.type(currentTextLine as string);
      if (!dialogBoxVisible) {
        // If its not visible, make it
        setDialogBoxVisible(true);
      }
    }
  }, [currentIndex, textLines]);

  DialogBoxController.setTextLines = (lines: string[]) => {
    setTextLines(lines);
  };
  DialogBoxController.nextLine = next;

  function next() {
    AudioEffects.play('keycap');
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

  const continueTranslation = t('continuationText').split('{{iconHere}}');

  return (
    <>
      <div className="fixed flex justify-center w-full bottom-24">
        <div
          id="dialog-box"
          className={classNames(
            [{hidden: !dialogBoxVisible}],
            'relative z-10 p-8 text-white bg-black w-full max-w-[1200px] border-white select-none mx-10 opacity-60 h-96 border-8 text-7xl transform xl:scale-50 2xl:scale-100 xl:translate-y-[20%] 2xl:translate-y-0'
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
              {continueTranslation[0]}
              <RiSpace className="mt-2 mx-2" />
              {continueTranslation[1]}
            </p>
          </div>
        </>
      )}
    </>
  );
}
