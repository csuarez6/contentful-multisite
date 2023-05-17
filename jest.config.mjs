import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // verbose: true,
  // transform: {
  //   "^.+\\.(tsx)?$": "@swc/jest",
  // },
  transformIgnorePatterns: [
    '/node_modules/(?![swiper/react/swiper-react.js])',
    '/node_modules/(?![swiper/react/swiper.js])'
  ],
  transform: {
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
      ".mocks.{js,jsx,tsx}",
      ".stories.tsx"
  ],
  "collectCoverageFrom": [
    "<rootDir>/src/components/**/*.{js,jsx,tsx}"
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)