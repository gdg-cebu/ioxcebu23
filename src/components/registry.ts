import dynamic from 'next/dynamic';

import type * as React from 'react';

const components: Record<string, any> = {
  HomePageLayout: dynamic(() => import('./layouts/HomePageLayout')),
  EventPageLayout: dynamic(() => import('./layouts/EventPageLayout')),
  DividerSection: dynamic(() => import('./sections/DividerSection')),
  EventInfoSection: dynamic(() => import('./sections/EventInfoSection')),
  GallerySection: dynamic(() => import('./sections/GallerySection')),
  PartnersSection: dynamic(() => import('./sections/PartnersSection')),
  ScheduleSection: dynamic(() => import('./sections/ScheduleSection')),
  SocialSection: dynamic(() => import('./sections/SocialSection')),
  SpacerSection: dynamic(() => import('./sections/SpacerSection')),
  SpeakersSection: dynamic(() => import('./sections/SpeakersSection')),
  StatsSection: dynamic(() => import('./sections/StatsSection')),
};

export function getComponent(name: string): React.ComponentType | null {
  return components[name] || null;
}
