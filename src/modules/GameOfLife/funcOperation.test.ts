import { fieldData } from "./dataTest";
import { getRandomieDataField, isFinish } from "./funcOperation";

describe("Test Random fill field", () => {
  it("test with fill 30%", () => {
    const rate = 30;
    const x = 10,
      y = 10;
    const fieldFill = getRandomieDataField(x, y, rate);
    const countCellFill = fieldFill.flat().reduce((acc, item) => acc + item, 0);
    expect(countCellFill).toBe(rate);
  });

  it("test not finish", () => {
    const checkField = isFinish(
      fieldData.fieldDataNotFinish.fieldCurrent,
      fieldData.fieldDataNotFinish.fieldDataPrev,
      fieldData.fieldDataNotFinish.fieldDataPrev2
    );
    expect(checkField).toBeFalsy();
  });
});
