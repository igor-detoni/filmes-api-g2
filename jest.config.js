module.exports = {
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  globalSetup: './src/tests/setup.js',
  globalTeardown: './src/tests/teardown.js'
};