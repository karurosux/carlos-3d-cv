import classNames from 'classnames';
import {KeyboardEvent, useEffect, useState} from 'react';
import {UIBox} from '../ui-box/UIBox';
import {MenuOption} from './models/menu-option';
import {MenuSelection} from './models/menu-selection';
import {computerMenuViewMap} from './views/computer-menu-view-map';

const menuOptions: MenuOption[] = [
  {
    label: 'General',
    value: MenuSelection.General,
  },
  {
    label: 'Job History',
    value: MenuSelection.JobHistory,
  },
  {
    label: 'Achievements',
    value: MenuSelection.Achievements,
  },
  {
    label: 'Exit',
    value: MenuSelection.Exit,
    action: () => {
      alert('Exit..');
    },
  },
];

export function ComputerMenu() {
  const [selected] = useState(MenuSelection.General);

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent): any => {
      switch (evt.code) {
        case 'ArrowDown':
        case 'KeyS':
          // Down

          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown as any);
    return () => window.removeEventListener('keydown', handleKeyDown as any);
  }, []);

  const SelectedView = computerMenuViewMap[selected];

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div className="container flex flex-1 h-[80%]">
        <UIBox className="flex-1 text-white computer-menu-wrapper">
          <ul className="menu-options [&>li]:my-4 [&>li]:p-2 [&>li]:text-center [&>li.selected]:bg-white [&>li.selected]:text-black">
            {menuOptions.map((option) => (
              <li
                key={option.value}
                className={classNames({
                  selected: option.value === selected,
                })}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </UIBox>
        <UIBox className="flex-grow ml-8 text-white computer-menu-wrapper">
          {SelectedView && <SelectedView />}
        </UIBox>
      </div>
    </div>
  );
}
