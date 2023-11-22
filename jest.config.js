const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // verbose: true,
  transform: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js",
    "\\.(css|less)$": "<rootDir>/fileTransformer.js",
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    "swiper/react": "<rootDir>/node_modules/swiper/react/swiper-react.js",
    "swiper/css": "<rootDir>/node_modules/swiper/swiper.min.css",
    "swiper/css/bundle": "<rootDir>/node_modules/swiper/swiper-bundle.min.css",
    "swiper/css/autoplay": "<rootDir>/node_modules/swiper/modules/autoplay/autoplay.min.css",
    "swiper/css/free-mode": "<rootDir>/node_modules/swiper/modules/autoplay/free-mode.min.css",
    "swiper/css/navigation": "<rootDir>/node_modules/swiper/modules/autoplay/navigation.min.css",
    "swiper/css/pagination": "<rootDir>/node_modules/swiper/modules/autoplay/pagination.min.css"
  },
  "collectCoverage": true,
  "coveragePathIgnorePatterns": [
    ".mocks.{js,ts,jsx,tsx}",
    ".stories.tsx",
    "<rootDir>/src/components/templates/tienda-virtual/checkout/",
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(config);
module.exports = async () => ({
  /**
   * Using ...(await createJestConfig(config)()) to override transformIgnorePatterns
   * provided byt next/jest.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096635363
   */
  ...(await createJestConfig(config)()),
  /**
   * Swiper use ECMAScript Modules (ESM) and Jest provides some experimental support for it
   * but "node_modules" are not transpiled by next/jest yet.
   *
   * The "transformIgnorePatterns" on "jest.config.js" prevents the Swiper files from being
   * transformed by Jest but it affects the CSS files that are provided by this package.
   * Mocking these CSS files is the solution that demands the smallest configuration.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096698456
   * @link https://jestjs.io/docs/ecmascript-modules
   */
  "collectCoverageFrom": [
    "<rootDir>/src/components/**/*.{js,jsx,tsx}"
  ],
  transformIgnorePatterns: ["node_modules/(?!(swiper|ssr-window|dom7)/)"],
});
