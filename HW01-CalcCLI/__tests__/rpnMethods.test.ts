import {
  getMathSymbols,
  getOutputRPN,
  evalExpressionRPN,
} from "../src/rpnMethods";

describe("Testing getMathSymbols", () => {
  it("Test getMathSymbols from expression '2.21 + 2 * 3 -8 /9'", () => {
    const EXPRESSION = "2.21 + 2 * 3 -8 /9";
    const ACTUAL_MATH_SYMBOL = ["2.21", "+", "2", "*", "3", "-", "8", "/", "9"];
    expect(getMathSymbols(EXPRESSION)).toStrictEqual(ACTUAL_MATH_SYMBOL);
  });
});

describe("Testing getOutputRPN", () => {
  it("Test getOuputRPN from mathSymbols `['2.21', '+', '2', '*', '3', '-', '8', '/', '9']`", () => {
    const MATH_SYMBOLS: string[] = [
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
    const ACTUAL_OUTPUT: string[] = [
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
    expect(getOutputRPN(MATH_SYMBOLS)).toStrictEqual(ACTUAL_OUTPUT);
  });
});

describe("Testing evalExpressionRPN", () => {
  it("Test evalExpressionRPN from OutputRPN: ['2.21', '2', '3', ' * ', '8', '9,' ' / ', ' - ', ' + ']", () => {
    const OUTPUT_RPN = ["2.21", "2", "3", "*", "8", "9", "/", "-", "+"];
    const ACTUAL_RESULT = 7.321111111111111;
    expect(evalExpressionRPN(OUTPUT_RPN)).toBe(ACTUAL_RESULT);
  });
});
