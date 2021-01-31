import { isValidExpression } from "../src/checks";

const str = "2 + 2 * 3";
const strWrong = "4 - g / 8";
const strEpmtyWrong = "";

describe("Tests validation module", () => {
  it("expression is valid '2 + 2 * 3'", () => {
    expect(isValidExpression(str)).toBeTruthy();
  });

  it("expression is not valid '4+g*8'", () => {
    expect(isValidExpression(strWrong)).toBeFalsy();
  });

  it("expression is not valid '4+g*8'", () => {
    expect(isValidExpression(strEpmtyWrong)).toBeFalsy();
  });
});
