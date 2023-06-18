/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  plugins: [
    {
      module: require('sourcebit-source-filesystem'),
      options: {
        watch: isDev,
        sources: [
          { name: 'pages', path: path.resolve(__dirname, 'content/pages') },
          { name: 'data', path: path.resolve(__dirname, 'content/data') },
        ],
      },
    },
    {
      module: require('sourcebit-target-next'),
      options: {
        liveUpdate: isDev,
        flattenAssetUrls: true,
        pages(objects) {
          return objects
            .filter((object) => object.__metadata.sourceName === 'pages')
            .map((object) => ({
              ...object.frontmatter,
              __metadata: object.__metadata,
            }));
        },
      },
    },
  ],
};
