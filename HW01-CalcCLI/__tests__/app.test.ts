import { isValidExpression } from "../src/checks";
describe("Tests validation module", () => {
  test("expression is valid '2 + 2 * 3'", () => {
    const str = "2+2*3";
    expect(isValidExpression(str)).toBeTruthy();
  });
});
