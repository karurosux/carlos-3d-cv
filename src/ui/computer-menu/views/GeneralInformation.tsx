import {
  CV_BIRTHPLACE,
  CV_CURRENT_COMPANY,
  CV_CURR_COMPANY_URL,
  CV_CURR_LOCATION,
  CV_NAME,
  CV_ROLE,
  CV_TITLE,
} from '../../../constants';

export function GeneralInformation() {
  return (
    <div className="h-full">
      <h3 className="mb-4 font-bold">General Information</h3>
      <p>
        My name is <b>{CV_NAME}</b> and I am a {CV_TITLE} who currently work
        mostly as a {CV_ROLE} at{' '}
        <a className="underline" target="_blank" href={CV_CURR_COMPANY_URL}>
          {CV_CURRENT_COMPANY}
        </a>
        .
        <br />I am from {CV_BIRTHPLACE}, currently living at {CV_CURR_LOCATION}.
      </p>
    </div>
  );
}
