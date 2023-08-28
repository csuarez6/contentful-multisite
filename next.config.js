/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

// const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
const isProduction = false;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['pages', 'src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  extends: [
    'plugin:@next/next/recommended',
  ],
  images: {
    domains: ['images.ctfassets.net', 'picsum.photos', 'placeholder', 'via.placeholder.com', 'data.commercelayer.app', 'tienda.grupovanti.com'],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      },
      {
        source: '/home/:slug*',
        destination: '/:slug*',
        permanent: true
      }
    ];
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_COMMERCELAYER_ENDPOINT: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT,
    NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID: process.env.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID,
    NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE: process.env.NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE,
  },
  staticPageGenerationTimeout: 300,
  experimental: {
    largePageDataBytes: 1024 * 1024
  },
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'strict-transport-security',
            value: 'max-age=31557600; includeSubDomains; preload',
          },
          {
            key: 'x-xss-protection',
            value: '1; mode=block',
          },
          {
            key: 'x-frame-options',
            value: 'SAMEORIGIN',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'max-age=900',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=0',
          },
          {
            key: 'Cache-Control',
            value: 'max-age=0',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'no-store, must-revalidate',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-store, must-revalidate',
          },
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

if (isProduction) {
  nextConfig['sentry'] = {
    hideSourceMaps: true,
  };
}

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = isProduction ? withSentryConfig(nextConfig, sentryWebpackPluginOptions) : nextConfig;
