import moment from 'moment';
import classnames from 'classnames';
import {jobHistory} from '../../../constants/job-history';
import {useTranslation} from 'react-i18next';

export function JobHistory() {
  const {t} = useTranslation();
  return (
    <div className="job-history">
      <h1 className="mb-4 font-bold">{t('jobHistory.title')}</h1>
      <ul>
        {jobHistory
          .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
          .map((item) => (
            <li
              key={item.title}
              className={classnames('relative mb-8', {
                'text-green-600': item.current,
              })}
            >
              <h2 className="py-4 border-2 border-l-0 border-r-0 border-dashed">
                {item.title}{' '}
                {item.current && (
                  <i className="text-4xl uppercase">({t('general.current')})</i>
                )}
              </h2>
              <ul className="text-4xl">
                <li className="dates">
                  {moment(item.startDate).format(t('dateFormats.short'))} -{' '}
                  {item.endDate
                    ? moment(item.endDate).format(t('dateFormats.short'))
                    : t('general.today')}
                </li>
                <li>
                  <b>{t('general.company')}</b> {item.company}
                </li>
                <li>
                  <b>{t('general.website')}</b>{' '}
                  <a href={item.website} target="_blank">
                    {item.website}
                  </a>
                </li>
                <li>
                  <h2 className="py-2 my-2 border-2 border-t-0 border-l-0 border-r-0 border-dashed">
                    {t('general.projects')}
                  </h2>
                  <ul className="pl-8 list-disc">
                    {item.projects.map((project) => (
                      <li key={project}>{project}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <h2 className="py-2 my-2 border-2 border-t-0 border-l-0 border-r-0 border-dashed">
                    {t('general.technologies')}
                  </h2>
                  <ul className="pt-4">
                    {item.technologies.map((item) => (
                      <li
                        key={item}
                        className="inline-block p-4 m-2 text-4xl border-4 border-dashed rounded-full"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
}
