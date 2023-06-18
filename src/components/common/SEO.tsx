import { useContext } from 'react';
import Head from 'next/head';
import { EventConfigContext } from '../../contexts/event-config';

import type * as React from 'react';
import type * as types from 'types';

export type Props = { page: types.SourcebitPage & types.SEO };

const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const SEO: React.FC<Props> = ({ page }) => {
  const eventConfig = useContext(EventConfigContext);
  const title = page.seoTitle || `${page.title} | ${eventConfig.name}`;
  const nameMetas = prepareMetas(
    {
      description: page.seoDescription || eventConfig.description,
      'twitter:card': 'summary',
    },
    page.seoTags
  );
  const propertyMetas = prepareMetas(
    {
      'og:title': title,
      'og:type': 'website',
      'og:image': SITE_URL + (page.seoImage?.url ?? eventConfig.logo.url),
      'og:url': page.seoUrl
        ? page.seoUrl.startsWith('http')
          ? page.seoUrl
          : SITE_URL + page.seoUrl
        : SITE_URL + page.__metadata.urlPath,
    },
    page.seoTags
  );

  return (
    <Head>
      <title>{title}</title>
      {nameMetas.map((meta, index) => (
        <meta key={`name-${index}`} name={meta.property} content={meta.content} />
      ))}
      {propertyMetas.map((meta, index) => (
        <meta key={`property-${index}`} property={meta.property} content={meta.content} />
      ))}
    </Head>
  );
};

const prepareMetas = (metas: Record<string, string>, extensions: types.MetaTag[] = []): types.MetaTag[] => {
  for (const { property, content } of extensions) {
    if (property in metas) {
      metas[property] = content;
    }
  }
  return Object.keys(metas).map((key) => ({ property: key, content: metas[key] }));
};

export default SEO;
