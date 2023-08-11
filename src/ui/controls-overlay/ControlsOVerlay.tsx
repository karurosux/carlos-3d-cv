import {
  RiArrowDownFill,
  RiArrowLeftFill,
  RiArrowRightFill,
  RiArrowUpFill,
} from 'react-icons/ri';

export function ControlsOverlay() {
  return (
    <div className="fixed top-0 left-0 p-4 text-2xl text-white">
      <p>
        Use <RiArrowLeftFill className="inline" />
        <RiArrowDownFill className="inline" />
        <RiArrowRightFill className="inline" />
        <RiArrowUpFill className="inline" /> or <b className="!text-1xl tracking-wider">WASD</b>{' '}
        to move.
      </p>
    </div>
  );
}
