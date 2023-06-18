import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Menu as MenuIcon } from 'react-feather';
import Drawer from './Drawer';
import { getEventObjectId } from '../../utils/stackbit';
import * as types from '../../../types';

import type * as React from 'react';

export type Props = types.HeaderConfig & types.StackbitAnnotation;

const NavDrawer: React.FC<Props> = ({ sb, ...headerConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { navLinks } = headerConfig;

  useEffect(() => {
    const handleRouteChangeStart = () => setIsOpen(false);
    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => router.events.off('routeChangeStart', handleRouteChangeStart);
  });

  const getActiveClass = (url: string) =>
    url === router.asPath
      ? 'bg-primary-faded text-primary'
      : 'hover:bg-complementary-faded focus:bg-complementary-faded';

  return (
    <>
      <button className="block md:hidden w-11 h-11 rounded-full hover:bg-complementary-faded focus:bg-complementary-faded">
        <MenuIcon className="w-6 h-6 mx-auto" onClick={() => setIsOpen(true)} />
      </button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <div className="mb-6">{renderTitle(headerConfig)}</div>

          {(navLinks?.length ?? 0) > 0 && (
            <div data-sb-field-path={sb}>
              {navLinks?.map((link, index) => (
                <span className="block my-1" key={index} data-sb-field-path={`.[${index}]`}>
                  <Link href={link.url} passHref>
                    <a
                      className={`block py-2 px-4 rounded ${getActiveClass(link.url)}`}
                      data-sb-field-path=".label .url#@href"
                    >
                      {link.label}
                    </a>
                  </Link>
                </span>
              ))}
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

const renderTitle = ({
  title,
  titleImage,
  titleImageHeight = 64,
  titleDisplay = types.HeaderTitleDisplay.NONE,
}: types.HeaderConfig): React.ReactNode => {
  if (titleDisplay === types.HeaderTitleDisplay.NONE) {
    return null;
  }
  return (
    <span className="inline-block" data-sb-object-id={getEventObjectId()}>
      <Link href="/" passHref>
        {titleDisplay === types.HeaderTitleDisplay.LOGO && titleImage?.url ? (
          <a
            className="inline-block relative"
            style={{
              aspectRatio: `${titleImage.width || 16} / ${titleImage.height || 9}`,
              height: `${titleImageHeight}px`,
            }}
            data-sb-field-path=".logo"
          >
            <Image
              src={titleImage.url}
              alt={titleImage.alt}
              layout="fill"
              objectFit="contain"
              objectPosition="left center"
              data-sb-field-path=".url#@src .alt#@alt"
            />
          </a>
        ) : (
          <a className="inline-block py-2 px-4 rounded text-xl font-medium hover:bg-gray-100 focus:bg-gray-100">
            <h1 data-sb-field-path=".name">{title}</h1>
          </a>
        )}
      </Link>
    </span>
  );
};

export default NavDrawer;
