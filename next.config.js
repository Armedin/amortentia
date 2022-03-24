const path = require('path');

/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@kukui/ui',
  '@kukui/types',
  '@kukui/system',
  '@kukui/icons',
]);

//  When using npm link to test the kukui, you get some errors
// https://reactjs.org/warnings/invalid-hook-call-warning.html
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  eslint: {
    dirs: ['.'],
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve('./node_modules/react'),
    };
    return config;
  },
};

module.exports = withTM(nextConfig);
