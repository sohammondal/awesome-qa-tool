/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import nextJest from "next/jest";
import type { Config } from "jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  clearMocks: true,

  collectCoverage: true,
  coverageProvider: "v8",
  coverageDirectory: "./reports/coverage",
  coverageReporters: ["json", "html"],
  coveragePathIgnorePatterns: ["<rootDir>/utils/test/", "<rootDir>/e2e-tests/"],

  testEnvironment: "jsdom",

  testPathIgnorePatterns: ["/reports/", "/utils/test/", "/e2e-tests"],

  watchPathIgnorePatterns: ["./reports/"],

  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./reports/",
        filename: "test-report.html",
      },
    ],
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
