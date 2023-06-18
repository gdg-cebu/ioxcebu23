import { createContext } from 'react';

import type * as types from 'types';

export const defaultSiteConfig: types.SiteConfig = {};
export const SiteConfigContext = createContext<types.SiteConfig>(defaultSiteConfig);
export const SiteConfigProvider = SiteConfigContext.Provider;
