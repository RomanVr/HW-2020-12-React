import { isValidExpression } from "../src/checks";

const str = "2 + 2 * 3";
const strLevel2 = "2! + 2 ** - 3 ^ 2";
const strLevel3 = "2! * (2 - 3 * (2 + 1)) ^ 2";
const strLevel4 = "2 * sin(2 + 3) + 2";

const strWrong = "4 - g / 8";
const strEpmtyWrong = "";

describe("Tests validation module", () => {
  it.each([str, strLevel2, strLevel3, strLevel4])(
    "expression is valid: '%s'",
    (expr) => {
      expect(isValidExpression(expr)).toBeTruthy();
    }
  );
});

describe("Tests is not valid", () => {
  it.each([strWrong, strEpmtyWrong])(
    "expression is not valid '%s'",
    (exprWrong) => {
      expect(isValidExpression(exprWrong)).toBeFalsy();
    }
  );
});
