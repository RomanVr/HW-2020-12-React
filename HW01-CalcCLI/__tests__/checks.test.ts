import { isValidExpression } from "../src/checks";

const STR = "2 + 2 * 3";
const STR_LEVEL2 = "2! + 2 ** - 3 ^ 2";
const STR_LEVEL3 = "2! * (2 - 3 * (2 + 1)) ^ 2";
const STR_LEVEL4 = "2 * sin(2 + 3) + 2";

const STR_WRONG = "4 - g / 8";
const STR_EMPTY_WRONG = "";

describe("Tests validation module", () => {
  it.each([STR, STR_LEVEL2, STR_LEVEL3, STR_LEVEL4])(
    "expression is valid: '%s'",
    (expr) => {
      expect(isValidExpression(expr)).toBeTruthy();
    }
  );
});

describe("Tests is not valid", () => {
  it.each([STR_WRONG, STR_EMPTY_WRONG])(
    "expression is not valid '%s'",
    (exprWrong) => {
      expect(isValidExpression(exprWrong)).toBeFalsy();
    }
  );
});
