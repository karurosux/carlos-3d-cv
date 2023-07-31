import {UserData} from '../../../constants/user';

export function GeneralInformation() {
  return (
    <div className="h-full">
      <h3 className="mb-4 font-bold">General Information</h3>
      <p className="text-4xl">
        <span className="inline-block mt-8">
          My name is{' '}
          <b>
            {UserData.firstName} {UserData.lastName}
          </b>{' '}
          and you can call me {UserData.nickName}, I am a{' '}
          {UserData.currentTitle} who currently work mostly as a{' '}
          {UserData.currentRole} at{' '}
          <a
            className="underline"
            target="_blank"
            href={UserData.currentCompanyWebsite}
          >
            {UserData.currentCompany}
          </a>
          .
        </span>
        <span className="inline-block mt-8">
          I am from {UserData.birthPlace}, currently living at{' '}
          {UserData.currentLocation} waiting for new adventures.
        </span>
      </p>
    </div>
  );
}
