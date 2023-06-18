import omit from 'lodash/omit';
import Image from 'next/image';
import Link from 'next/link';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Link as LinkIcon,
} from 'react-feather';
import BaseSection from '../common/BaseSection';
import Markdown from '../common/Markdown';

import type * as React from 'react';
import type * as Feather from 'react-feather';
import type * as types from 'types';

const SOCIAL_ICONS: Record<string, Feather.Icon> = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  website: LinkIcon,
};

export type Props = types.SocialSection & types.StackbitAnnotation;

const SocialSection: React.FC<Props> = (section) => {
  return (
    <BaseSection sb={section.sb}>
      <div className="xl:container mx-auto flex flex-wrap md:flex-nowrap items-center">
        <div className="w-full md:max-w-lg">
          {renderContent(section)}
          {renderLinks(section)}
        </div>
        {renderImage(section)}
      </div>
    </BaseSection>
  );
};

const renderContent = ({ content }: types.SocialSection): React.ReactNode => {
  if (!content) {
    return null;
  }
  return <Markdown content={content} className="mb-5" sb=".content" />;
};

const renderLinks = ({ links }: types.SocialSection): React.ReactNode => {
  if ((links?.length ?? 0) === 0) {
    return null;
  }
  return (
    <div className="flex flex-wrap -m-2" data-sb-field-path=".links">
      {links.map((link, index) => (
        <Link key={index} href={link.url} passHref>
          <a
            className="flex items-center justify-center w-10 h-10 m-2 rounded-full font-zero bg-primary hover:bg-primary-int focus:bg-primary-int"
            title={link.label}
            data-sb-field-path={`.[${index}]`}
          >
            {getSocialIconForUrl(link.url)}
          </a>
        </Link>
      ))}
    </div>
  );
};

const renderImage = ({ image }: types.SocialSection): React.ReactNode => {
  if (!image?.url) {
    return null;
  }
  const aspectRatio = `${image.width || 16} / ${image.height || 9}`;
  return (
    <div className="md:flex-grow ml-auto mt-10 md:mt-0 md:pl-8">
      <div className="h-20 md:h-28 relative md:ml-auto" style={{ aspectRatio }} data-sb-field-path=".image">
        <Image
          src={image.url}
          alt={image.alt}
          layout="fill"
          objectFit="contain"
          objectPosition="center center"
          data-sb-field-path=".url#@src .alt#@alt"
        />
      </div>
    </div>
  );
};

const getSocialIconForUrl = (url: string): React.ReactNode => {
  let IconComponent = SOCIAL_ICONS.website;
  try {
    const origin = new URL(url).origin;
    const keys = Object.keys(omit(SOCIAL_ICONS, ['website']));
    for (const key of keys) {
      if (origin.includes(key)) {
        IconComponent = SOCIAL_ICONS[key];
        break;
      }
    }
  } catch (error) {
    // silenly fail
  }
  return <IconComponent className="w-5 h-5 text-on-primary" />;
};

export default SocialSection;
