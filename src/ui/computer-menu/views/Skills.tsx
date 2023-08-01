import {VictoryBar, VictoryChart, VictoryTheme} from 'victory';
import {SkillsData} from '../../../constants/skills';

export function Skills() {
  return (
    <div className="skills">
      <h1 className="mb-4 font-bold">Skills</h1>
      <div className="languages">
        <VictoryChart
          theme={VictoryTheme.material}
          padding={{top: 12, left: 50, right: 50, bottom: 50}}
          height={200}
        >
          <VictoryBar
            style={{data: {fill: 'white'}}}
            data={SkillsData.languages}
          />
        </VictoryChart>
      </div>
      <ul className="mt-8 tecnologies">
        <li className="py-4 mb-8 border-2 border-l-0 border-r-0 border-dashed">
          Technologies:
        </li>
        {SkillsData.technologies.map((item) => (
          <li
            key={item}
            className="inline-block p-4 m-2 text-4xl border-4 border-dashed rounded-full"
          >
            {item}
          </li>
        ))}
      </ul>
      <ul className="mt-8 favorites">
        <li className="py-4 mb-8 border-2 border-l-0 border-r-0 border-dashed">
          Favorites:
        </li>
        {SkillsData.favorites.map((item) => (
          <li
            key={item}
            className="inline-block p-4 m-2 text-4xl border-4 border-dashed rounded-full"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
