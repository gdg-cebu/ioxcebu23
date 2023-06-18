import Link from 'next/link';

import type * as React from 'react';
import type * as types from 'types';

export type Props = { className?: string; href?: string; variant?: 'default' | 'primary' } & types.StackbitAnnotation;

const Button: React.FC<React.PropsWithChildren<Props>> = ({ children, className, href, variant = 'default', sb }) => {
  const classNames = [
    'inline-block',
    'py-3',
    'px-8',
    'border',
    'rounded',
    'text-base',
    'font-medium',
    variant === 'default' &&
      'border-complemetary text-primary hover:border-primary-faded hover:bg-primary-faded focus:border-primary-faded focus:bg-primary-faded',
    variant === 'primary' &&
      'border-primary bg-primary text-on-primary hover:bg-primary-int hover:border-primary-int focus:bg-primary-int focus:border-primary-int',
    className,
  ].join(' ');

  if (href) {
    return (
      <Link href={href} passHref>
        <a className={classNames} data-sb-field-path={sb}>
          {children}
        </a>
      </Link>
    );
  }

  return <button className={classNames}>{children}</button>;
};

export default Button;
