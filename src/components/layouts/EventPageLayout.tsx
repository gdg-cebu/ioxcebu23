import { useContext } from 'react';
import Image from 'next/image';
import BaseLayout from '../common/BaseLayout';
import DynamicSection from '../common/DynamicSection';
import { EventConfigContext } from '../../contexts/event-config';

import type * as React from 'react';
import type * as types from 'types';

const EventPageLayout: React.FC<types.EventPage> = (page) => {
  const { title, subtitle, showLogo = false, sections } = page;
  const eventConfig = useContext(EventConfigContext);

  return (
    <BaseLayout page={page}>
      <header className="pt-8 px-6 md:pt-20">
        <div className="xl:container mx-auto">
          {showLogo && renderLogo(eventConfig.logo)}
          <div>
            <h1 className="inline-block text-4xl md:text-5xl font-normal" data-sb-field-path=".title">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="md:max-w-2xl mt-8 text-lg md:text-xl" data-sb-field-path=".subtitle">
              {subtitle}
            </p>
          )}
        </div>
      </header>

      <div className="flex flex-col flex-grow" data-sb-field-path=".sections">
        {sections.map((section, index) => (
          <DynamicSection key={index} section={section} sb={`.[${index}]`} />
        ))}
      </div>
    </BaseLayout>
  );
};

const renderLogo = (logo: types.Image): React.ReactNode => {
  if (!logo) {
    return null;
  }
  const aspectRatio = `${logo.width || 16} / ${logo.height || 9}`;
  return (
    <div className="relative h-28 mb-8" style={{ aspectRatio }} data-sb-field-path=".showLogo">
      <Image src={logo.url} alt={logo.alt} layout="fill" objectFit="contain" objectPosition="center center" />
    </div>
  );
};

export default EventPageLayout;
