/** @type {import('ts-jest').ProjectConfigTsJest} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@test/(.*)$': '<rootDir>/__test__/$1',
  },
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['lib/**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};
