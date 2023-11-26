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
  // reactStrictMode: true,
  env: {
    UPLOADED_FILES_DESTINATION: process.env.UPLOADED_FILES_DESTINATION,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  },
  distDir: '../../.next',
  // basePath: path.join(__dirname, 'src/client'),
  eslint: {
    dirs: ['src/client'],
  },
  // webpack: config => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     react: path.resolve('./node_modules/react'),
  //   };
  //   return config;
  // },
  typescript: {
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !!
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['wpbingosite.com'],
  },
  // experimental: {
  //   modularizeImports: {
  //     '@kukui/ui/?(((\\w*)?/?)*)': {
  //       transform: '@kukui/ui/{{ matches.[1] }}/{{member}}',
  //     },
  //     '@kukui/icons/?(((\\w*)?/?)*)': {
  //       transform: '@kukui/icons/{{ matches.[1] }}/{{member}}',
  //     },
  //   },
  // },
};

module.exports = withTM(nextConfig);
