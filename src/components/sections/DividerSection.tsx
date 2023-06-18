import type * as React from 'react';
import type * as types from 'types';

export type Props = types.StackbitAnnotation;

const DividerSection: React.FC<Props> = ({ sb }) => {
  return <hr className="border-complementary" data-sb-field-path={sb} />;
};

export default DividerSection;
