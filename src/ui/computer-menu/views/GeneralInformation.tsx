import {useTranslation} from 'react-i18next';
import {UserData} from '../../../constants/user';

export function GeneralInformation() {
  const {t} = useTranslation();
  const {
    firstName,
    lastName,
    currentCompanyWebsite,
    currentTitle,
    hobbies,
    nickName,
    birthDate,
    birthPlace,
    currentRole,
    currentCompany,
    currentLocation,
  } = UserData;
  return (
    <div className="h-full">
      <h3 className="mb-4 font-bold">{t('generalInformation.title')}</h3>
      <p
        className="text-4xl"
        dangerouslySetInnerHTML={{
          __html: t('generalInformation.message', {
            firstName,
            lastName,
            currentCompanyWebsite,
            currentTitle,
            hobbies,
            nickName,
            birthDate,
            birthPlace,
            currentRole,
            currentCompany,
            currentLocation,
          }),
        }}
      />
    </div>
  );
}
