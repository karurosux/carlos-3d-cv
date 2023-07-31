import {RiSpace} from 'react-icons/ri';

export function Exit() {
  return (
    <div>
      <p className="flex text-3xl text-white uppercase break-keep whitespace-nowrap animate-pulse">
        Press&nbsp;
        <RiSpace className="mt-2" />
        &nbsp;to interact
      </p>
    </div>
  );
}
