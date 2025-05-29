import {useState} from 'react';
import {InteractionTextController} from './interaction-text-controller';
import {useTranslation} from 'react-i18next';
import {RiSpace} from 'react-icons/ri';

type Props = {
  inline?: boolean;
};

export function InteractionText(props: Props) {
  const {t} = useTranslation();
  const [showInteractText, setShowInteractText] = useState(false);

  InteractionTextController.showInteractionText = (show) => {
    if (showInteractText !== show) {
      setShowInteractText(show);
    }
  };

  const translation = t('interactionText').split('{{iconHere}}');

  if (props.inline) {
    return (
      <p className="flex text-base sm:text-3xl text-white uppercase break-keep whitespace-nowrap animate-pulse">
        {translation[0]} <RiSpace className="mt-0 sm:mt-2 mx-1 sm:mx-2" /> {translation[1]}
      </p>
    );
  }

  if (!showInteractText) {
    return <></>;
  }

  return (
    <div className="fixed z-20 flex justify-center w-full bottom-6 sm:bottom-10">
      <p className="flex text-base sm:text-3xl text-white uppercase break-keep whitespace-nowrap animate-pulse">
        {translation[0]} <RiSpace className="mt-0 sm:mt-2 mx-1 sm:mx-2" /> {translation[1]}
      </p>
    </div>
  );
}
