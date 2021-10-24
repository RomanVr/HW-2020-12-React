import { fieldClick, fieldData, fieldResize } from "./dataTest";
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
    expect(gameRdx(stateStart, { type: GAME_PAUSE }).start).toBeFalsy();
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
  });

  it("action random field", () => {
    const fieldRandom = [
      [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
    ];
    jest.mock("./gameRdx", () => {
      const originalModule = jest.requireActual("./gameRdx");
      return {
        __esModule: true,
        ...originalModule,
        getRandomieDataField: jest.fn(() => fieldRandom),
      };
    });
    expect(gameRdx(initialState, fillRandomField(30)).fieldCurrent).toEqual(
      fieldRandom
    );
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
  });

  it("action resize", () => {
    expect(gameRdx(initialState, resizeField(3, 3)).fieldCurrent).toEqual(
      fieldResize
    );
  });

  it("action clickCell", () => {
    expect(gameRdx(initialState, clickOnCellAction(0, 0)).fieldCurrent).toEqual(
      fieldClick
    );
  });
});
