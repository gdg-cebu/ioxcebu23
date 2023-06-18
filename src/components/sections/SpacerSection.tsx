import BaseSection from '../common/BaseSection';
import * as types from '../../../types';

import type * as React from 'react';

const SIZE_CLASSES: Record<types.SpacerSize, string> = {
  [types.SpacerSize.SMALL]: 'h-10 md:h-20',
  [types.SpacerSize.MEDIUM]: 'h-16 md:h-32',
  [types.SpacerSize.LARGE]: 'h-20 md:h-44',
  [types.SpacerSize.FLEX]: 'flex-grow',
};

export type Props = types.SpacerSection & types.StackbitAnnotation;

const SpacerSection: React.FC<Props> = ({ size = types.SpacerSize.SMALL, sb }) => {
  const className = SIZE_CLASSES[size];
  return <BaseSection className={className} sb={sb} />;
};

export default SpacerSection;
