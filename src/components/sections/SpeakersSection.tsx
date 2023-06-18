import Image from 'next/image';
import BaseSection from '../common/BaseSection';

import type * as React from 'react';
import type * as types from 'types';

export type Props = types.SpeakersSection & types.StackbitAnnotation;

const SpeakersSection: React.FC<Props> = (section) => {
  return (
    <BaseSection sb={section.sb}>
      <div className="xl:container mx-auto">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-sb-field-path=".speakers">
          {section.speakers.map((speaker, index) => (
            <div key={index} data-sb-field-path={`.[${index}]`}>
              <article
                className="p-6 border border-complementary rounded text-center"
                data-sb-object-id={speaker.__metadata.id}
              >
                {renderImage(speaker)}
                {renderDetails(speaker)}
                {speaker.bio && (
                  <p className="mt-auto text-sm md:text-base text-copy-faded line-clamp-4" data-sb-field-path=".bio">
                    {speaker.bio}
                  </p>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </BaseSection>
  );
};

const renderImage = (speaker: types.Speaker): React.ReactNode => {
  const { image } = speaker;
  return (
    <div className="w-28 h-28 mx-auto mb-6">
      {image ? (
        <div className="w-full h-full relative" data-sb-field-path=".image">
          <Image
            src={image.url}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            className="rounded-full"
            data-sb-field-path=".url#@src .alt#@alt"
          />
        </div>
      ) : (
        <div className="w-full h-full rounded-full bg-complementary-faded" />
      )}
    </div>
  );
};

const renderDetails = (speaker: types.Speaker): React.ReactNode => {
  const { name, designation, company } = speaker;
  return (
    <>
      <h2 className="text-lg md:text-xl" data-sb-field-path=".name">
        {name}
      </h2>
      {(designation || company) && (
        <p className="mb-6 text-sm md:text-base text-copy-faded">
          {designation && <span data-sb-field-path=".designation">{designation}</span>}
          {designation && company && ', '}
          {company && <span data-sb-field-path=".company">{company}</span>}
        </p>
      )}
    </>
  );
};

export default SpeakersSection;
