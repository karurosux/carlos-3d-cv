import {useTranslation} from 'react-i18next';
import {
  RiArrowDownFill,
  RiArrowLeftFill,
  RiArrowRightFill,
  RiArrowUpFill,
} from 'react-icons/ri';
import {UIBox} from '../ui-box/UIBox';
import {en} from '../../locales/en';
import {i18n} from '../../i18n';
import {es} from '../../locales/es';
import {PPUtils} from '../../utils/pp-util';

export function ControlsOverlay() {
  const {t} = useTranslation();

  const handleChangeLanguage = (lang: string) => () => {
    window.localStorage.setItem('lang', lang);
    window.location.reload();
  };

  const handleTogglePostProcess = () => PPUtils.togglePPParam();

  return (
    <>
      <div className="top-left-container fixed top-4 left-4 max-w-[250px]">
        <UIBox className="w-auto h-auto border p-2 mb-2">
          <span>
            <h2 className="text-3xl font-bold mb-2">{t('general.controls')}</h2>
            <h4 className="text-2xl underline">{t('general.movement')}</h4>
            <span className="text-2xl block">
              <RiArrowLeftFill className="inline" />
              <RiArrowDownFill className="inline" />
              <RiArrowRightFill className="inline" />
              <RiArrowUpFill className="inline" /> |
              <b className="!text-1xl ml-2">WASD</b>
            </span>
            <h4 className="text-2xl underline">{t('general.interact')}</h4>
            <span className="text-xl block">
              {t('indications.spaceBarMessage')}
            </span>
          </span>
        </UIBox>
        <UIBox className="w-auto h-auto border p-2">
          <p className="text-xl">{t('indications.general')}</p>
        </UIBox>
      </div>
      <div className="top-right-container fixed top-4 right-4 hover:touch-pan-right">
        <button
          className="border-2 mr-2 text-white p-2 cursor-pointer"
          onClick={handleTogglePostProcess}
        >
          {t('togglePostProcess')}
        </button>
        <select
          value={i18n.language}
          className="p-2 border-2 border-white bg-transparent text-white cursor-pointer"
        >
          <option
            className="hover:cursor-pointer"
            value="en"
            onClick={handleChangeLanguage('en')}
          >
            {en.name}
          </option>
          <option
            className="hover:cursor-pointer"
            value="es"
            onClick={handleChangeLanguage('es')}
          >
            {es.name}
          </option>
        </select>
      </div>
    </>
  );
}
