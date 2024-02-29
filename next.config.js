/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
  reactStrictMode: false,
  experimental: {
    allowMiddlewareResponseBody: true,
  },
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
      "static.placetopay.com",
    ],
    loader: "custom",
    loaderFile: "./src/utils/image-loader.js",
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/checkout/pse/:slug*",
        destination: "/tienda-virtual/checkout/pse/:slug*",
        permanent: true,
      },
      {
        source: "/home/:slug*",
        destination: "/:slug*",
        permanent: true,
      },
      {
        source: "/acceso",
        destination: "https://mi.grupovanti.com/",
        permanent: true,
      },
      {
        source: "/registro",
        destination: "https://mi.grupovanti.com/registro",
        permanent: true,
      },
      {
        source: "/forgotpassword",
        destination: "https://mi.grupovanti.com/recuperacion",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/",
        permanent: true,
      },
      {
        source: "/dashboard/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/hogar/servicio-al-cliente/oficina-virtual",
        destination: "/acceso",
        permanent: true,
      },
      {
        source:
          "/hogar/servicio-al-cliente/servicio-en-linea/solicitud-factura-por-correo-electronico:path*",
        destination:
          "/tramites-y-ayuda/factura/conoce-tu-factura/factura-electronica",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/2022/08/:path*",
        destination:
          "https://assets.ctfassets.net/3brzg7q3bvg1/xZ50lHtTYcNcfJGNylmSW/0e0592c5468f64506254613c8dede1c5/CL_USULAS_CORPORATIVAS_PARA_LA_WEB.pdf",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/2023/07/VERSION-4.-300623-CONDICIONES-GENERALES-Y-ANEXOS-VANTI-LISTO-CONVENIO-DE-FINANCIACION-NO-BANCARIZADA-_compressed.pdf",
        destination:
          "https://downloads.ctfassets.net/3brzg7q3bvg1/7K87w4KRjZRJb6XWPzwpCF/7a9032f77ad779f5f4eea72e97b1b2ca/VERSION_4._300623_CONDICIONES_GENERALES_Y_ANEXOS_VANTI_LISTO_CONVENIO_DE_FINANCIACION_NO_BANCARIZADA___1_.pdf",
        permanent: true,
      },
    ];
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_COMMERCELAYER_ENDPOINT:
      process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT,
    NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID:
      process.env.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID,
    NEXT_PUBLIC_COMMERCELAYER_GASODOMESTICOS_MARKET_ID:
      process.env.NEXT_PUBLIC_COMMERCELAYER_GASODOMESTICOS_MARKET_ID,
    NEXT_PUBLIC_COMMERCELAYER_VANTILISTO_MARKET_ID:
      process.env.NEXT_PUBLIC_COMMERCELAYER_VANTILISTO_MARKET_ID,
  },
  serverRuntimeConfig: {
    siteList: [
      {
        domain: "www.vantilisto.com",
        root_path: "/vantilisto",
        site_paths: "^/((?!api|_next/static|_next/image|favicon.ico).*)",
      },
      {
        domain: "www.grupovanti.com",
        root_path: "/grupovanti",
        is_default_site: true,
        site_paths: "^/((?!api|_next/static|_next/image|favicon.ico).*)",
      }
    ]
  },
  staticPageGenerationTimeout: 300,
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  async headers() {
    const headers = [
      {
        source: "/:path*",
        headers: [
          {
            key: "Vercel-CDN-Cache-Control",
            value: "max-age=600, stale-while-revalidate",
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
          {
            key: "Content-Security-Policy",
            value:
              "upgrade-insecure-requests; block-all-mixed-content; base-uri 'self';",
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
    if (
      process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === "qualitycontrol"
    ) {
      headers.push({
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        source: "/:path*",
      });
    }
    return headers;
  },
};
