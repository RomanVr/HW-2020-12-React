import { isValidExpression } from "../src/checks";

const str = "2 + 2 * 3";
const strLevel2 = "2! + 2 ** - 3 ^ 2";
const strLevel3 = "2! * (2 - 3 * (2 + 1)) ^ 2";

const strWrong = "4 - g / 8";
const strEpmtyWrong = "";

describe("Tests validation module", () => {
  it("expression is valid '2 + 2 * 3'", () => {
    expect(isValidExpression(str)).toBeTruthy();
  });

  it("expression with ** ^ ! is valid '2! + 2 ** - 3 ^ 2'", () => {
    expect(isValidExpression(strLevel2)).toBeTruthy();
  });

  it("expression with () is valid '2! * (2 - 3*(2-1)) ^ 2'", () => {
    expect(isValidExpression(strLevel3)).toBeTruthy();
  });

  it("expression is not valid '4+g*8'", () => {
    expect(isValidExpression(strWrong)).toBeFalsy();
  });

  it("expression EMPTY is  not valid ''", () => {
    expect(isValidExpression(strEpmtyWrong)).toBeFalsy();
  });
});
