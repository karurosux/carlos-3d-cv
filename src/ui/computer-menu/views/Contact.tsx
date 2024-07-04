import {useTranslation} from 'react-i18next';
import {ContactInformation} from '../../../constants/contact';

export function Contact() {
  const {t} = useTranslation();
  return (
    <div className="contact">
      <h3 className="mb-4 font-bold">{t('general.contact')}</h3>
      <ul className="[&>li]:mt-4 text-4xl [&>li]:border-b-2 [&>li]:border-dashed [&>li]:py-2">
        <li>
          <b>Linked In(preferred):</b>{' '}
          <a href={ContactInformation.linkedIn} target="_blank">
            {ContactInformation.linkedIn}
          </a>
        </li>
        <li>
          <b>Github:</b>{' '}
          <a href={ContactInformation.github} target="_blank">
            {ContactInformation.github}
          </a>
        </li>
        <li>
          <b>Soundcloud:</b>{' '}
          <a href={ContactInformation.soundcloud} target="_blank">
            {ContactInformation.soundcloud}
          </a>
        </li>
        <li>
          <b>Unsplash:</b>{' '}
          <a href={ContactInformation.unsplash} target="_blank">
            {ContactInformation.unsplash}
          </a>
        </li>
      </ul>
    </div>
  );
}
