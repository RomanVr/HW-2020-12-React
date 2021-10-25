import { fieldClick, fieldData, fieldRandom, fieldResize } from "./dataTest";
import gameRdx, {
  GAME_START,
  GAME_PAUSE,
  incVelosity,
  decVelosity,
  checkFinish,
  fillRandomField,
  CLEAR_FIELD,
  nextStepAction,
  resizeField,
  clickOnCellAction,
} from "./gameRdx";
import * as funcOperation from "./funcOperation";

describe("Test game reducer", () => {
  const initialState = {
    fieldCurrent: new Array(10).fill(null).map(() => new Array(10).fill(0)),
    fieldDataPrev: new Array(10).fill(null).map(() => new Array(10).fill(0)),
    fieldDataPrev2: new Array(10).fill(null).map(() => new Array(10).fill(0)),
    countStep: 0,
    start: false,
    finish: false,
    speed: 100,
  };
  const finishState = {
    fieldCurrent: fieldData.fieldDataNotFinish.fieldCurrent,
    fieldDataPrev: fieldData.fieldDataNotFinish.fieldDataPrev,
    fieldDataPrev2: fieldData.fieldDataNotFinish.fieldDataPrev2,
    countStep: 0,
    start: false,
    finish: true,
    speed: 100,
  };

  it("default action", () => {
    const actionEmpty = { type: "" };
    expect(gameRdx(undefined, actionEmpty)).toEqual(initialState);
  });

  it("action start / pause", () => {
    const stateStart = {
      fieldCurrent: new Array(10).fill(null).map(() => new Array(10).fill(0)),
      fieldDataPrev: new Array(10).fill(null).map(() => new Array(10).fill(0)),
      fieldDataPrev2: new Array(10).fill(null).map(() => new Array(10).fill(0)),
      countStep: 0,
      start: true,
      finish: false,
      speed: 100,
    };
    expect(gameRdx(initialState, { type: GAME_START }).start).toBeTruthy();
    expect(gameRdx(finishState, { type: GAME_START })).toEqual(finishState);
    expect(gameRdx(stateStart, { type: GAME_PAUSE }).start).toBeFalsy();
    expect(gameRdx(finishState, { type: GAME_PAUSE })).toEqual(finishState);
  });

  it("action inc / dec velosity", () => {
    const stateIncVel = {
      fieldCurrent: new Array(10).fill(null).map(() => new Array(10).fill(0)),
      fieldDataPrev: new Array(10).fill(null).map(() => new Array(10).fill(0)),
      fieldDataPrev2: new Array(10).fill(null).map(() => new Array(10).fill(0)),
      countStep: 0,
      start: false,
      finish: false,
      speed: 101,
    };
    expect(gameRdx(initialState, incVelosity())).toEqual(stateIncVel);
    expect(gameRdx(stateIncVel, decVelosity())).toEqual(initialState);
  });

  it("action check finish", () => {
    const stateFinishDefault = {
      fieldCurrent: fieldData.fieldDefault.fieldCurrent,
      fieldDataPrev: fieldData.fieldDefault.fieldDataPrev,
      fieldDataPrev2: fieldData.fieldDefault.fieldDataPrev2,
      countStep: 0,
      start: false,
      finish: true,
      speed: 101,
    };
    expect(gameRdx(stateFinishDefault, checkFinish()).finish).toBeTruthy();
    const stateFinishOneStep = {
      fieldCurrent: fieldData.fieldDataOneStep.fieldCurrent,
      fieldDataPrev: fieldData.fieldDataOneStep.fieldDataPrev,
      fieldDataPrev2: fieldData.fieldDataOneStep.fieldDataPrev2,
      countStep: 0,
      start: false,
      finish: true,
      speed: 101,
    };
    expect(gameRdx(stateFinishOneStep, checkFinish()).finish).toBeTruthy();
    const stateFinishTwoStep = {
      fieldCurrent: fieldData.fieldDataTwoStep.fieldCurrent,
      fieldDataPrev: fieldData.fieldDataTwoStep.fieldDataPrev,
      fieldDataPrev2: fieldData.fieldDataTwoStep.fieldDataPrev2,
      countStep: 0,
      start: false,
      finish: true,
      speed: 101,
    };
    expect(gameRdx(stateFinishTwoStep, checkFinish()).finish).toBeTruthy();
    expect(gameRdx(finishState, checkFinish())).toEqual(finishState);
  });

  it("action random field", () => {
    const spyRandom = jest.spyOn(funcOperation, "getRandomieDataField");
    spyRandom.mockReturnValue(fieldRandom);
    expect(gameRdx(initialState, fillRandomField(30)).fieldCurrent).toEqual(
      fieldRandom
    );
    expect(gameRdx(finishState, fillRandomField(30))).toEqual(finishState);
  });

  it("action clear field", () => {
    const stateToClear = {
      fieldCurrent: fieldData.fieldDataTwoStep.fieldCurrent,
      fieldDataPrev: fieldData.fieldDataTwoStep.fieldDataPrev,
      fieldDataPrev2: fieldData.fieldDataTwoStep.fieldDataPrev2,
      countStep: 10,
      start: true,
      finish: false,
      speed: 101,
    };
    expect(gameRdx(stateToClear, { type: CLEAR_FIELD })).toEqual({
      ...initialState,
      speed: stateToClear.speed,
    });
  });

  it("action next step", () => {
    const stateNextStep = {
      fieldCurrent: fieldData.fieldDataTwoStep.fieldCurrent,
      fieldDataPrev: fieldData.fieldDefault.fieldDataPrev,
      fieldDataPrev2: fieldData.fieldDefault.fieldDataPrev2,
      countStep: 10,
      start: true,
      finish: false,
      speed: 101,
    };
    expect(gameRdx(stateNextStep, nextStepAction()).fieldCurrent).toEqual(
      fieldData.fieldDataTwoStep.fieldDataPrev
    );
    expect(gameRdx(finishState, nextStepAction())).toEqual(finishState);
  });

  it("action resize", () => {
    expect(gameRdx(initialState, resizeField(3, 3)).fieldCurrent).toEqual(
      fieldResize
    );
    expect(gameRdx(finishState, resizeField(3, 3))).toEqual(finishState);
  });

  it("action clickCell", () => {
    expect(gameRdx(initialState, clickOnCellAction(0, 0)).fieldCurrent).toEqual(
      fieldClick
    );
    expect(gameRdx(finishState, clickOnCellAction(0, 0))).toEqual(finishState);
  });
});
