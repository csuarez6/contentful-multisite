/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require("@sentry/nextjs");

// const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
const isProduction = false;
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  style-src 'self';
  font-src 'self';
`;
// {
//   key: "Content-Security-Policy",
//   value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
// },

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["pages", "src"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  extends: ["plugin:@next/next/recommended"],
  images: {
    domains: [
      "images.ctfassets.net",
      "picsum.photos",
      "placeholder",
      "via.placeholder.com",
      "data.commercelayer.app",
      "tienda.grupovanti.com",
      "static.placetopay.com"
    ],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home/:slug*",
        destination: "/:slug*",
        permanent: true,
      },
    ];
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_COMMERCELAYER_ENDPOINT: process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT,
    NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID: process.env.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID,
    NEXT_PUBLIC_COMMERCELAYER_GASODOMESTICOS_MARKET_ID: process.env.NEXT_PUBLIC_COMMERCELAYER_GASODOMESTICOS_MARKET_ID,
    NEXT_PUBLIC_COMMERCELAYER_VANTILISTO_MARKET_ID: process.env.NEXT_PUBLIC_COMMERCELAYER_VANTILISTO_MARKET_ID,
  },
  staticPageGenerationTimeout: 300,
  experimental: {
    largePageDataBytes: 1024 * 1024
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Vercel-CDN-Cache-Control",
            value: "max-age=900, stale-while-revalidate",
          },
          {
            key: "CDN-Cache-Control",
            value: "no-store, must-revalidate",
          },
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
          {
            key: "strict-transport-security",
            value: "max-age=31557600; includeSubDomains; preload",
          },
          {
            key: "x-xss-protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "x-frame-options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Vercel-CDN-Cache-Control",
            value: "no-store, must-revalidate",
          },
          {
            key: "CDN-Cache-Control",
            value: "no-store, must-revalidate",
          },
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

if (isProduction) {
  nextConfig["sentry"] = {
    hideSourceMaps: true,
  };
}

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = isProduction
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;
