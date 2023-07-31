import {education} from '../../../constants/education';

export function Education() {
  return (
    <div className="education">
      <h3 className="mb-4 font-bold">Education</h3>
      <div>
        <ul>
          {education.map((item) => (
            <li key={item.title} className="relative mb-8">
              <h2 className="py-4 border-2 border-l-0 border-r-0 border-dashed">
                {item.title}
              </h2>
              <ul className="text-4xl">
                <li>
                  <b>Place:</b> {item.place}
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
