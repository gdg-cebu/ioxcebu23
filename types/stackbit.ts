import type * as types from 'types';

export interface SourcebitObjectMetaData {
  id: string;
  source: string;
  sourceName: string;
  sourcePath: string;
  relSourcePath: string;
  relProjectPath: string;
  modelType: string;
  modelName: string;
  modelLabel: string;
  urlPath: string;
}

export interface SourcebitData {
  __metadata: SourcebitObjectMetaData;
}

export interface SourcebitPage {
  layout: string;
  __metadata: SourcebitObjectMetaData;
}

export interface SourcebitSourceData {
  objects: SourcebitData[];
  pages: SourcebitPage[];
}

export type PageProps =
  | {
      page?: SourcebitPage;
      siteConfig: types.SiteConfig;
      eventConfig: types.EventConfig;
    }
  | Record<string, never>;

export interface StackbitAnnotation {
  sb?: string;
}
