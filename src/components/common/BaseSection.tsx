import type * as React from 'react';
import type * as types from 'types';

export type Props = React.PropsWithChildren & types.StackbitAnnotation & { className?: string };

const BaseSection: React.FC<Props> = ({ children, className = 'py-8 px-6 md:py-20', sb }) => {
  return (
    <section className={className} data-sb-field-path={sb}>
      {children}
    </section>
  );
};

export default BaseSection;
