// conftest.js - Shared test configuration

module.exports = {
  // Global test setup
  setupFilesAfterEnv: ['<rootDir>/test_code/conftest.js'],
  
  // Test environment
  testEnvironment: 'node',
  
  // Coverage configuration
  collectCoverageFrom: [
    'source_code/backend/**/*.js',
    '!source_code/backend/**/node_modules/**',
  ],
  
  // Timeouts
  testTimeout: 10000,
};

// Helper functions for tests
global.testSetup = () => {
  // Setup database connection for tests
};

global.testTeardown = () => {
  // Clean up after tests
};
