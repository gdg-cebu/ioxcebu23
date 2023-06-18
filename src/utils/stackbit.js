import get from 'lodash/get';
import { defaultEventConfig } from '../contexts/event-config';
import { defaultSiteConfig } from '../contexts/site-config';

const resolvers = {
  HomePage(object, data) {
    object.sections = object.sections?.map((section) => resolveObjects(section, data));
    return object;
  },
  EventPage(object, data) {
    object.sections = object.sections?.map((section) => resolveObjects(section, data));
    return object;
  },
  SpeakersSection(object, data) {
    object.speakers = object.speakers?.map((speaker) => resolveObjectPath(speaker, data));
    return object;
  },
  ScheduleSection(object, data) {
    object.tracks = object.tracks?.map((track) => {
      track.sessions = track.sessions
        ?.map((session) => resolveObjectPath(session, data))
        .map((session) => resolveObjects(session, data));
      return track;
    });
    return object;
  },
  Session(object, data) {
    object.speakers = object.speakers?.map((speaker) => resolveObjectPath(speaker, data));
    return object;
  },
};

export function slugToUrlPath(slug) {
  return '/' + [].concat(slug).join('/');
}

export function resolveObjectPath(path, data) {
  return data.objects.find((object) => object.__metadata.relProjectPath === path);
}

export function resolveObjects(object, data) {
  if (!object) {
    return null;
  }
  const type = get(object, '__metadata.modelName', get(object, 'type'));
  if (!(type in resolvers)) {
    return object;
  }
  const resolver = resolvers[type];
  return resolver(object, data);
}

export function resolveStaticProps(urlPath, data) {
  const page = resolveObjects(
    data.pages.find((page) => page.__metadata.urlPath === urlPath),
    data
  );
  const siteConfig = data.objects.find((object) => object.__metadata.id === getSiteObjectId()) || defaultSiteConfig;
  const eventConfig = data.objects.find((object) => object.__metadata.id === getEventObjectId()) || defaultEventConfig;
  return { page, siteConfig, eventConfig };
}

export function getSiteObjectId() {
  return 'content/data/site.json';
}

export function getEventObjectId() {
  return 'content/data/event.json';
}
