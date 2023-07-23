import classNames from 'classnames';
import {first, isFunction, last} from 'lodash';
import {useEffect, useState} from 'react';
import {useGameInputs} from '../../utils/game-input-provider/use-game-inputs';
import {UIBox} from '../ui-box/UIBox';
import {MenuOption} from './models/menu-option';
import {MenuSelection} from './models/menu-selection';
import {computerMenuViewMap} from './views/computer-menu-view-map';
import {ComputerMenuManager} from './computer-menu-manager';

export function ComputerMenu() {
  const [selected, setSelected] = useState(MenuSelection.General);
  const {subscribeKey} = useGameInputs();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const upUnsubscribe = subscribeKey((input) => input.forward, handleMoveUp);
    const downUnsubscribe = subscribeKey(
      (input) => input.backward,
      handleMoveDown
    );
    const actionUnsubscribe = subscribeKey(
      (input) => input.action,
      handleActionPressed
    );

    return () => {
      upUnsubscribe();
      downUnsubscribe();
      actionUnsubscribe();
    };
  }, [selected, setSelected]);

  ComputerMenuManager.openComputerMenu = () => {
    setVisible(true);
    setSelected(menuOptions[0].value);
  };

  const move = (delta: number) => {
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
    }
    setSelected(menuOption.value);
  };

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
      label: 'Contact',
      value: MenuSelection.Contact,
    },
    {
      label: 'Exit',
      value: MenuSelection.Exit,
      action: () => {
        setVisible(false);
        ComputerMenuManager.onComputerMenuExit?.();
      },
    },
  ];

  const SelectedView = computerMenuViewMap[selected];

  if (!visible) {
    return <></>;
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center">
      <div className="container flex flex-1 h-[80%]">
        <UIBox className="flex-1 text-white computer-menu-wrapper min-w-[350px]">
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
        <UIBox className="relative flex-grow ml-8 text-white computer-menu-wrapper">
          {SelectedView && <SelectedView />}
        </UIBox>
      </div>
    </div>
  );
}
