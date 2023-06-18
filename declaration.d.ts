declare module '*.module.css';
declare module '*.css';

declare module 'sourcebit-target-next' {
  type SourcebitSourceData = import('./types').SourcebitSourceData;

  interface SourcebitDataClient {
    getData: () => Promise<SourcebitSourceData>;
  }

  export const sourcebitDataClient: SourcebitDataClient;
}

declare module 'sourcebit-target-next/with-remote-data-updates';
