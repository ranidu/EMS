module.exports = {
  transform: {
    "^.+\\.js?$": require.resolve("babel-jest"),
    "^.+\\.ts?$": "ts-jest"
  },
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/**/*.(test|spec).(ts|tsx|js)"],
  coveragePathIgnorePatterns: [
    "<rootDir>/test/helpers/",
    "<rootDir>/node_modules/"
  ],
  clearMocks: true,
  verbose: true,
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coverageDirectory: "coverage"
};
