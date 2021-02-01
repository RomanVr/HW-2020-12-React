import execute from "../src";

describe("Testing application", () => {
  it("Test level 1 simple expression '2.21 + 2 * 3 - 8 / 4'", () => {
    const expression = "2.21 + 2 * 3 -8 /4";
    const result = 6.21;
    expect(execute(expression)).toBe(result);
  });

  it("Test level 2 expression '2.21 + 2 ** + 3 ^ 3 - 4!'", () => {
    const expression = "2.21 + 2 ** + 3 ^ 3 - 4!";
    const result = 9.21;
    expect(execute(expression)).toBe(result);
  });

  it("Test level 3 expression '2! * (2 - 3*(2-1)) ^ 2'", () => {
    const expression = "2! * (2 - 3*(2+1)) ^ 2";
    const result = 98;
    expect(execute(expression)).toBe(result);
  });
});
