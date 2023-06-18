import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cloneDeep from 'lodash/cloneDeep';
import Nav from './Nav';
import NavDrawer from './NavDrawer';
import { EventConfigContext } from '../../contexts/event-config';
import { getEventObjectId } from '../../utils/stackbit';
import * as types from '../../../types';

import type * as React from 'react';

export type Props = types.HeaderConfig & types.StackbitAnnotation;

const Header: React.FC<Props> = (props) => {
  const eventConfig = useContext(EventConfigContext);
  const data = prepareHeaderData(props, eventConfig);

  return (
    <header className="py-4 px-6" data-sb-field-path={props.sb}>
      <div className="xl:container mx-auto flex items-center">
        {renderTitle(data)}
        {renderNav(data)}
        {renderDrawer(data)}
      </div>
    </header>
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
    <span data-sb-object-id={getEventObjectId()}>
      <Link href="/" passHref>
        {titleDisplay === types.HeaderTitleDisplay.LOGO && titleImage?.url ? (
          <a
            className="inline-block relative"
            title={title}
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
          <a className="inline-block py-2 px-4 -mx-4 rounded text-xl font-medium hover:bg-complementary-faded focus:bg-complementary-faded">
            <h1 data-sb-field-path=".name">{title}</h1>
          </a>
        )}
      </Link>
    </span>
  );
};

const renderNav = ({ navLinks }: types.HeaderConfig): React.ReactNode => {
  if (!navLinks || navLinks.length === 0) {
    return null;
  }
  return (
    <div className="hidden md:block ml-auto -mr-4">
      <Nav links={navLinks} sb=".navLinks" />
    </div>
  );
};

const renderDrawer = (headerConfig: types.HeaderConfig): React.ReactNode => {
  return (
    <div className="md:hidden ml-auto -mr-3">
      <NavDrawer {...headerConfig} sb=".navLinks" />
    </div>
  );
};

const prepareHeaderData = (header: types.HeaderConfig, eventConfig: types.EventConfig): types.HeaderConfig => {
  const data = cloneDeep(header);
  data.title = eventConfig.name;
  data.titleImage = eventConfig.logo;
  return data;
};

export default Header;
