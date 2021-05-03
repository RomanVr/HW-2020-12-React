import execute from "../src/";

describe("Testing application", () => {
  it.each([
    ["2.21 + 2 * 3 -8 /4", 6.21],
    ["2.21 + 2 ** + 3 ^ 3 - 4!", 9.21],
    ["2! * (2 - 3*(2+1)) ^ 2", 98],
    ["2 * sin(2 + 3) + 2", 0.08215145067372309],
    ["cos(7*2) + 2", 2.1367372182078337],
    ["2 * fib(2 + 3) - 2", 8],
  ])("Expression '%s' get result: %d", (expr, number) => {
    expect(execute(expr)).toBe(number);
  });
});

const EXPRESSION_EMPTY = "";
const EXPRESSION_TO_BIG = "180! * (2 - 3*(2-1))";

describe("Testing application with Errors", () => {
  it("Test wrong expression Empty''", () => {
    const t = () => execute(EXPRESSION_EMPTY);
    expect(t).toThrowError(Error);
  });

  it("Test an argument of factorial expression '180! * (2 - 3*(2-1))'", () => {
    const RESULT_NEG_INFINITY = Number.NEGATIVE_INFINITY;
    expect(execute(EXPRESSION_TO_BIG)).toBe(RESULT_NEG_INFINITY);
  });
});
