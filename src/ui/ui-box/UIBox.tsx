import classNames from 'classnames';
import {HTMLAttributes, PropsWithChildren} from 'react';

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>;

export function UIBox({children, className, ...props}: Props) {
  const componentClasses = classNames(
    'z-10 p-8 text-white bg-black w-full border-white select-none opacity-60 border-8 text-6xl',
    className
  );
  return (
    <div {...props} className={componentClasses}>
      {children}
    </div>
  );
}
