import execute from "../src";

describe("Testing application", () => {
  it("Test expression '2.21 + 2 * 3 - 8 / 4'", () => {
    const expression = "2.21 + 2 * 3 -8 /4";
    const result = 6.21;
    expect(execute(expression)).toBe(result);
  });
});
