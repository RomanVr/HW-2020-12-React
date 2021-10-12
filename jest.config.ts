/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: [
    "<rootDir>/internals/jestSettings.js",
    "<rootDir>/internals/jestSetup.ts",
  ],

  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.mdx$": "@storybook/addon-docs/jest-transform-mdx",
  },

  moduleNameMapper: {
    // https://jestjs.io/docs/en/webpack#handling-static-assets
    "\\.(css|less)$": "<rootDir>/internals/__mocks__/styleMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  moduleDirectories: ["node_modules", "src"],

  roots: ["<rootDir>/src"],

  testPathIgnorePatterns: ["/node_modules/", "e2e"],
};

export default config;
