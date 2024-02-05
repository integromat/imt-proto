/*
 * This is just a meta-file.
 * The configuration is loaded separately for Unit and Integration tests.
 */
module.exports = {
    /* Global Settings */
    preset: 'ts-jest',
    globals: {
      'ts-jest': {
        'tsconfig': '<rootDir>/tsconfig.spec.json',
      },
      ENV: 'test',
    },
    reporters: ['default', 'jest-junit'],
    verbose: true,
    silent: process.env.IMT_ENV !== 'test',
  
    /* Environment */
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'ts'],
  
    /* Match */
    testMatch: ['<rootDir>/test/**'],
  
    /* Coverage Settings */
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },
    collectCoverageFrom: ['<rootDir>/src/action.ts', '<rootDir>/src/trigger.ts', '<rootDir>/src/error.ts', '<rootDir>/src/warning.ts'],
    coverageDirectory: '<rootDir>/coverage',
    coveragePathIgnorePatterns: [],
    coverageReporters: ['text', 'text-summary', 'lcov']
};
  