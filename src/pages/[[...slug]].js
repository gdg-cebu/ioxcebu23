import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getComponent } from '../components/registry';
import { resolveStaticProps, slugToUrlPath } from '../utils/stackbit';
import { SiteConfigProvider } from '../contexts/site-config';
import { EventConfigProvider } from '../contexts/event-config';

const DynamicPage = ({ page, siteConfig, eventConfig }) => {
  const PageComponent = getComponent(page.layout);
  if (!PageComponent) {
    throw new Error(`Unknown layout: ${page.layout}`);
  }

  return (
    <SiteConfigProvider value={siteConfig}>
      <EventConfigProvider value={eventConfig}>
        <main className="flex flex-col flex-grow" data-sb-object-id={page.__metadata.id}>
          <PageComponent {...page} />
        </main>
      </EventConfigProvider>
    </SiteConfigProvider>
  );
};

export default withRemoteDataUpdates(DynamicPage);

export async function getStaticPaths() {
  const data = await sourcebitDataClient.getData();
  const paths = data.pages.map((page) => page.__metadata.urlPath);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await sourcebitDataClient.getData();
  const urlPath = slugToUrlPath(context.params?.slug ?? []);
  const props = resolveStaticProps(urlPath, data);
  return {
    props,
  };
}
