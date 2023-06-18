import { useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';
import { SiteConfigContext } from '../../contexts/site-config';
import { getSiteObjectId } from '../../utils/stackbit';

import type * as React from 'react';
import type * as types from 'types';

export type Props = React.PropsWithChildren & { page: types.SourcebitPage & types.SEO };

const BaseLayout: React.FC<Props> = ({ children, page }) => {
  const siteConfig = useContext(SiteConfigContext);
  const siteObjectId = getSiteObjectId();
  const { header, footer } = siteConfig;

  return (
    <>
      <SEO page={page} />
      {header && (
        <div data-sb-object-id={siteObjectId}>
          <Header {...header} sb=".header" />
        </div>
      )}
      {children}
      {footer && (
        <div className="mt-auto" data-sb-object-id={siteObjectId}>
          <Footer {...footer} sb=".footer" />
        </div>
      )}
    </>
  );
};

export default BaseLayout;
