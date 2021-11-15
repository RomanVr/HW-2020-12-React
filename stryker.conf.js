/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress", "dashboard"],
  testRunner: "jest",
  coverageAnalysis: "off",
  mutate: [
    "src/**/*.ts?(x)",
    "!src/**/*@(.test|.spec|Spec|stories|styled).ts?(x)",
  ],
  tsconfigFile: "tsconfig.json",
  // buildCommand: "npm run build",
};
