import {ContactInformation} from '../../../constants/contact';

export function Contact() {
  return (
    <div className="contact">
      <h3 className="mb-4 font-bold">Contact</h3>
      <ul className="[&>li]:mt-8">
        <li>
          <b>Email:</b>{' '}
          <a href={`mailto:${ContactInformation.email}`}>
            {ContactInformation.email}
          </a>
        </li>
        <li>
          <b>Github:</b>{' '}
          <a href={ContactInformation.github} target="_blank">
            {ContactInformation.github}
          </a>
        </li>
        <li>
          <b>Linked In:</b>{' '}
          <a href={ContactInformation.linkedIn} target="_blank">
            {ContactInformation.linkedIn}
          </a>
        </li>
      </ul>
    </div>
  );
}
