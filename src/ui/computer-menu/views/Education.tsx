import {useTranslation} from 'react-i18next';
import {education} from '../../../constants/education';

export function Education() {
  const {t} = useTranslation();

  return (
    <div className="education">
      <h1 className="mb-4 font-bold">{t('general.education')}</h1>
      <div>
        <ul>
          {education.map((item) => (
            <li key={item.title} className="relative mb-8">
              <h2 className="py-4 border-2 border-l-0 border-r-0 border-dashed">
                {item.title}
              </h2>
              <ul className="text-4xl">
                <li>
                  <b>{t('general.place')}</b> {item.place}
                </li>
                <li>
                  <b>Website:</b>{' '}
                  <a href={item.website} target="_blank">
                    {item.website}
                  </a>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
