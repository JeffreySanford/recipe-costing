module.exports = {
  displayName: 'costing-api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/app/**/*.spec.ts', '<rootDir>/ingredients/**/*.spec.ts', '<rootDir>/recipes/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: '../../coverage/apps/costing-api',
};
