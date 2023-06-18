import Image from 'next/image';

import type * as React from 'react';
import type * as types from 'types';

export type Props = types.FooterConfig & types.StackbitAnnotation;

const Footer: React.FC<Props> = (props) => {
  return (
    <footer className="py-10 px-6 bg-complementary-faded text-on-complementary" data-sb-field-path={props.sb}>
      <div className="xl:container mx-auto">
        <div className="flex flex-wrap items-center -mx-4 -my-2">
          {renderLogo(props)}
          {props.copyright && (
            <p className="mx-4 my-2 text-sm md:text-base" data-sb-field-path=".copyright">
              {props.copyright}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

const renderLogo = ({ logo }: types.FooterConfig): React.ReactNode => {
  if (!logo) {
    return null;
  }
  const aspectRatio = `${logo.width || 16} / ${logo.height || 9}`;
  return (
    <div className="h-16 mx-4 my-2 relative" style={{ aspectRatio }} data-sb-field-path=".logo">
      <Image
        src={logo.url}
        alt={logo.alt}
        layout="fill"
        objectFit="contain"
        objectPosition="left center"
        data-sb-field-path=".url#@src .alt#@alt"
      />
    </div>
  );
};

export default Footer;
