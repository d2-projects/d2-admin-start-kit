module.exports = {
  'moduleFileExtensions': [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  'transform': {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  'transformIgnorePatterns': [
    '<rootDir>/node_modules/(?!(modular-core|modular-vue|vuex-along))'
  ],
  'moduleNameMapper': {
    '^@/(.*)$': '<rootDir>/src/$1',
    'serverConfig': '<rootDir>/tests/mock/server.config.js',
    'logger': '<rootDir>/tests/mock/logger.js'
  },
  'snapshotSerializers': [
    'jest-serializer-vue'
  ],
  'testMatch': [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  'collectCoverageFrom': [
    '<rootDir>/src/**/*.{js,jsx,json,vue}'
  ],
  'coverageReporters': [
    'lcov',
    'html'
  ],
  'setupFiles': [
    '<rootDir>/tests/setup/requireContextRegister'
  ],
  'browser': true,
  'collectCoverage': true,
  'testURL': 'http://localhost/'
}
