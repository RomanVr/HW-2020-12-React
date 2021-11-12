/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: "npm",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "jest",
  coverageAnalysis: "perTest",
  mutate: [
    "src/**/*.ts?(x)",
    "!src/**/*@(.test|.spec|Spec|stories|styled).ts?(x)",
  ],
  tsconfigFile: "tsconfig.json",
  buildCommand: "npm run build",
};
