import classNames from 'classnames';
import {first, isFunction, last} from 'lodash';
import {useEffect, useState} from 'react';
import {useGameInputs} from '../../utils/game-input-provider/use-game-inputs';
import {UIBox} from '../ui-box/UIBox';
import {MenuOption} from './models/menu-option';
import {MenuSelection} from './models/menu-selection';
import {computerMenuViewMap} from './views/computer-menu-view-map';
import {ComputerMenuManager} from './computer-menu-manager';
import {Html} from '@react-three/drei';

export function ComputerMenu() {
  const [selected, setSelected] = useState(MenuSelection.General);
  const gameInputs = useGameInputs();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const upUnsubscribe = gameInputs?.subscribeKey(
      (input) => input.forward,
      handleMoveUp
    );
    const downUnsubscribe = gameInputs?.subscribeKey(
      (input) => input.backward,
      handleMoveDown
    );
    const actionUnsubscribe = gameInputs?.subscribeKey(
      (input) => input.action,
      handleActionPressed
    );

    return () => {
      upUnsubscribe?.();
      downUnsubscribe?.();
      actionUnsubscribe?.();
    };
  }, [selected, setSelected, active]);

  ComputerMenuManager.openComputerMenu = () => {
    setActive(true);
    setSelected(menuOptions[0].value);
  };

  const move = (delta: number) => {
    if (!active) {
      return;
    }
    const currentIndex = menuOptions.findIndex(
      (item) => item.value === selected
    );
    const newIndex = delta + currentIndex;

    if (newIndex < 0) {
      setSelected(first(menuOptions).value);
      return;
    }

    if (newIndex > menuOptions.length - 1) {
      setSelected(last(menuOptions).value);
      return;
    }

    setSelected(menuOptions[newIndex].value);
  };

  const handleMoveUp = () => move(-1);
  const handleMoveDown = () => move(1);

  const handleActionPressed = () => {
    const option = menuOptions.find((item) => item.value === selected);
    option.action?.(option.value);
  };

  const handleOptionClick = (menuOption: MenuOption) => () => {
    if (isFunction(menuOption.action)) {
      menuOption.action(menuOption.value);
    } else {
      setSelected(menuOption.value);
    }
  };

  const menuOptions: MenuOption[] = [
    {
      label: 'General',
      value: MenuSelection.General,
    },
    {
      label: 'Education',
      value: MenuSelection.Education,
    },
    {
      label: 'Job History',
      value: MenuSelection.JobHistory,
    },
    {
      label: 'Skills',
      value: MenuSelection.Skills,
    },
    {
      label: 'Contact',
      value: MenuSelection.Contact,
    },
    {
      label: 'Exit',
      value: MenuSelection.Exit,
      action: () => {
        setActive(false);
        setSelected(first(menuOptions).value);
        ComputerMenuManager.onComputerMenuExit?.();
      },
    },
  ];

  const SelectedView = computerMenuViewMap[selected];

  return (
    <Html
      transform
      wrapperClass="computer-screen !z-0"
      distanceFactor={0.3}
      position={[0, -0.01, -0.08]}
    >
      <div className="relative w-[1530px] h-[870px] p-4 bg-blue-700">
        <div className="absolute top-0 bottom-0 z-30 flex items-center justify-center left-8 right-8">
          <div className="container flex flex-1 h-[80%]">
            <UIBox className="flex-1 text-white computer-menu-wrapper min-w-[350px] overflow-y-auto">
              <ul className="menu-options [&>li]:my-4 [&>li]:p-2 [&>li]:text-center [&>li.selected]:bg-white [&>li.selected]:text-black">
                {menuOptions.map((option) => (
                  <li
                    key={option.value}
                    className={classNames('cursor-pointer', {
                      selected: option.value === selected,
                    })}
                    onClick={handleOptionClick(option)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </UIBox>
            <UIBox className="relative flex-grow ml-8 overflow-y-auto text-white computer-menu-wrapper">
              {SelectedView && <SelectedView />}
            </UIBox>
          </div>
        </div>
      </div>
    </Html>
  );
}
