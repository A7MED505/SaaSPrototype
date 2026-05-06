module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'app/**/*.js',
    '!app/static/**',
    '!node_modules/**'
  ],
  testMatch: ['**/__tests__/**/*.test.js', '**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js']
};
