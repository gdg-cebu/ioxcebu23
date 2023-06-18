import Image from 'next/image';
import Link from 'next/link';
import BaseSection from '../common/BaseSection';

import type * as React from 'react';
import type * as types from 'types';

export type Props = types.PartnersSection & types.StackbitAnnotation;

const PartnersSection: React.FC<Props> = (section) => {
  return (
    <BaseSection sb={section.sb}>
      <div className="xl:container mx-auto">
        <div className="mb-10">
          <h1 className="inline-block text-3xl md:text-4xl" data-sb-field-path=".title">
            {section.title}
          </h1>
        </div>
        {renderPartnerGroups(section)}
      </div>
    </BaseSection>
  );
};

const renderPartnerGroups = ({ groups }: types.PartnersSection): React.ReactNode => {
  return (
    <>
      {groups.map((group, index) => (
        <div key={index} className="mt-10" data-sb-field-path={`.groups.[${index}]`}>
          <div className="mb-8">
            <h2 className="inline-block text-lg md:text-xl" data-sb-field-path=".title">
              {group.title}
            </h2>
          </div>
          <div className="flex flex-wrap items-center -my-3" data-sb-field-path=".partners">
            {group.partners.map(renderPartner)}
          </div>
        </div>
      ))}
    </>
  );
};

const renderPartner = (partner: types.Partner, index: number): React.ReactNode => {
  const { name, url, logo, height = 60 } = partner;
  const aspectRatio = `${logo?.width || 16} / ${logo?.height || 9}`;

  const wrapContent = (content: React.ReactNode): React.ReactNode => {
    const props = {
      className: 'my-3 mx-6',
      style: { height: `${height}px`, aspectRatio },
      'data-sb-field-path': `.[${index}]`,
    };
    if (url) {
      return (
        <Link key={index} href={url} passHref>
          <a {...props}>{content}</a>
        </Link>
      );
    }
    return (
      <div key={index} {...props}>
        {content}
      </div>
    );
  };

  return wrapContent(
    logo ? (
      <div className="w-full h-full relative" data-sb-field-path=".logo">
        <Image
          src={logo.url}
          alt={logo.alt}
          title={name}
          layout="fill"
          objectFit="contain"
          objectPosition="center center"
          data-sb-field-path=".url#@src .alt#@alt"
        />
      </div>
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-complementary-faded rounded">
        <p data-sb-field-path=".name">{partner.name}</p>
      </div>
    )
  );
};

export default PartnersSection;
