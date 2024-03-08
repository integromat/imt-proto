/*
 * This is just a meta-file.
 * The configuration is loaded separately for Unit and Integration tests.
 */
module.exports = {
  /* Global Settings */
  preset: 'ts-jest',
  globals: {
    ENV: 'test',
  },
  reporters: ['default', 'jest-junit'],
  verbose: true,
  silent: process.env.IMT_ENV !== 'test',

  /* Environment */
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['js', 'ts'],

  /* Match */
  testMatch: ['<rootDir>/test/**'],

  /* Coverage Settings */
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  collectCoverageFrom: ['<rootDir>/src/**'],
  coverageDirectory: '<rootDir>/coverage/unit',
  coveragePathIgnorePatterns: [],
  coverageReporters: ['text', 'text-summary', 'lcov'],
};
