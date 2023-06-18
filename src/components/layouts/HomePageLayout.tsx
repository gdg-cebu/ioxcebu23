import BaseLayout from '../common/BaseLayout';
import DynamicSection from '../common/DynamicSection';

import type * as React from 'react';
import type * as types from 'types';

const HomePageLayout: React.FC<types.HomePage> = (page) => {
  const { sections } = page;
  return (
    <BaseLayout page={page}>
      <div className="flex flex-col flex-grow" data-sb-field-path=".sections">
        {sections.map((section, index) => (
          <DynamicSection key={index} section={section} sb={`.[${index}]`} />
        ))}
      </div>
    </BaseLayout>
  );
};

export default HomePageLayout;
