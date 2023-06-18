import { useContext } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { format } from 'date-fns';
import Image from 'next/image';
import BaseSection from '../common/BaseSection';
import Button from '../common/Button';
import { EventConfigContext } from '../../contexts/event-config';
import { getEventObjectId } from '../../utils/stackbit';

import type * as React from 'react';
import type * as types from 'types';

export type Props = types.EventInfoSection & types.StackbitAnnotation;

const EventInfoSection: React.FC<Props> = (section) => {
  const eventConfig = useContext(EventConfigContext);
  const data = prepareSectionData(section, eventConfig);

  const hasBanner = Boolean(data.banner);
  const containerClass = hasBanner ? 'justify-between' : 'justify-center';
  const detailsClass = hasBanner ? 'pb-8 md:max-w-lg text-left' : 'md:max-w-2xl text-center';

  return (
    <BaseSection sb={section.sb}>
      <section>
        <div className={`xl:container mx-auto flex items-center flex-wrap ${containerClass}`}>
          <div className={`md:pb-12 lg:pt-12 flex-grow ${detailsClass}`}>
            {renderLogo(data)}
            {renderDescription(data)}
            {renderDetails(data)}
            {renderCta(data)}
          </div>
          {renderBanner(data)}
        </div>
      </section>
    </BaseSection>
  );
};

const renderLogo = ({ logo, banner }: types.EventInfoSection): React.ReactNode => {
  if (!logo) {
    return null;
  }
  const logoClass = banner ? '' : 'mx-auto';
  return (
    <div
      className={`relative h-28 ${logoClass}`}
      style={{ aspectRatio: `${logo.width || 16} / ${logo.height || 9}` }}
      data-sb-field-path=".logo"
    >
      <Image
        src={logo.url}
        alt={logo.alt}
        layout="fill"
        objectFit="contain"
        objectPosition="center center"
        data-sb-field-path=".url#@src .alt#@alt"
      />
    </div>
  );
};

const renderDescription = ({ description }: types.EventInfoSection): React.ReactNode => {
  if (!description) {
    return null;
  }
  return (
    <div className="mt-6 md:mt-8 mb-12" data-sb-object-id={getEventObjectId()}>
      <h2 className="text-xl md:text-2xl font-normal leading-normal" data-sb-field-path=".description">
        {description}
      </h2>
    </div>
  );
};

const renderDetails = ({ date, venue }: types.EventInfoSection): React.ReactNode => {
  if (!date && !venue) {
    return null;
  }
  return (
    <p className="mt-5 text-lg md:text-xl" data-sb-object-id={getEventObjectId()}>
      {date && (
        <time className="inline-block" dateTime={date.toString()} data-sb-field-path=".date">
          {format(new Date(date), 'MMMM d, yyyy')}
        </time>
      )}
      {date && venue && <span className="mx-4">&middot;</span>}
      {venue && (
        <span className="inline-block" data-sb-field-path=".venue">
          {venue}
        </span>
      )}
    </p>
  );
};

const renderCta = ({ cta }: types.EventInfoSection): React.ReactNode => {
  if (!cta) {
    return null;
  }
  return (
    <div className="inline-block mt-5" data-sb-field-path=".cta">
      <Button href={cta.url} variant="primary" sb=".label .url#@href">
        {cta.label}
      </Button>
    </div>
  );
};

const renderBanner = ({ banner }: types.EventInfoSection): React.ReactNode => {
  if (!banner) {
    return null;
  }
  return (
    <div
      className="relative flex-grow -mx-6 w-full lg:w-auto lg:max-w-3xl lg:ml-6 lg:mr-0"
      style={{ aspectRatio: `${banner.width || 16} / ${banner.height || 9}` }}
      data-sb-field-path=".banner"
    >
      <Image
        src={banner.url}
        alt={banner.alt}
        layout="fill"
        objectFit="cover"
        objectPosition="center center"
        data-sb-field-path=".url#@src .alt#@alt"
      />
    </div>
  );
};

const prepareSectionData = (
  section: types.EventInfoSection,
  eventConfig: types.EventConfig
): types.EventInfoSection => {
  const data = cloneDeep(section);
  data.logo = data.logo || eventConfig.logo;
  data.description = eventConfig.description;
  data.date = eventConfig.date;
  data.venue = eventConfig.venue;
  return data;
};

export default EventInfoSection;
