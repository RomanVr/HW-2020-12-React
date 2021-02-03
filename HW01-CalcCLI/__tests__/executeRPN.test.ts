import { getMathSymbols, getOutputRPN } from "../src/rpnMethods";

describe("Testing module executeRPN", () => {
  it("Test getMathSymbols from expression '2.21 + 2 * 3 -8 /9'", () => {
    const expression = "2.21 + 2 * 3 -8 /9";
    const actualMathSymbol = ["2.21", "+", "2", "*", "3", "-", "8", "/", "9"];
    expect(getMathSymbols(expression)).toStrictEqual(actualMathSymbol);
  });

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
