/* eslint-disable @typescript-eslint/no-var-requires */
const withSourcebit = require('sourcebit').sourcebitNext();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withSourcebit(nextConfig);
