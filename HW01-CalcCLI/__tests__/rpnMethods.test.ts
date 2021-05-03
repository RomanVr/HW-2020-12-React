import {
  getMathSymbols,
  getOutputRPN,
  evalExpressionRPN,
} from "../src/rpnMethods";

describe("Testing getMathSymbols", () => {
  it("Test getMathSymbols from expression '2.21 + 2 * 3 -8 /9'", () => {
    const EXPRESSION = "2.21 + 2 * 3 -8 /9";
    const actualMathSymbols = ["2.21", "+", "2", "*", "3", "-", "8", "/", "9"];
    expect(getMathSymbols(EXPRESSION)).toStrictEqual(actualMathSymbols);
  });
});

describe("Testing getoutputRPN", () => {
  it("Test getOuputRPN from mathSymbols `['2.21', '+', '2', '*', '3', '-', '8', '/', '9']`", () => {
    const mathSymbols: string[] = [
      "2.21",
      "+",
      "2",
      "*",
      "3",
      "-",
      "8",
      "/",
      "9",
    ];
    const actualOutput: string[] = [
      "2.21",
      "2",
      "3",
      "*",
      "8",
      "9",
      "/",
      "-",
      "+",
    ];
    expect(getOutputRPN(mathSymbols)).toStrictEqual(actualOutput);
  });
});

describe("Testing evalExpressionRPN", () => {
  it("Test evalExpressionRPN from outputRPN: ['2.21', '2', '3', ' * ', '8', '9,' ' / ', ' - ', ' + ']", () => {
    const outputRPN = ["2.21", "2", "3", "*", "8", "9", "/", "-", "+"];
    const ACTUAL_RESULT = 7.321111111111111;
    expect(evalExpressionRPN(outputRPN)).toBe(ACTUAL_RESULT);
  });
});
