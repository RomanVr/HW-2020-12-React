import { fieldClick, fieldData, fieldRandom, fieldResize } from "./dataTest";
import gameRdx, {
  actions,
  initialState,
  selectCountStep,
  selectField,
  selectFinish,
  selectSpeed,
  selectStart,
} from "./gameRdx";
import * as funcOperation from "./funcOperation";
import { store } from "@/rdx/store";

describe("Test game reducer", () => {
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
    expect(gameRdx(initialState, actionEmpty)).toEqual(initialState);
  });

  it("action start / pause", () => {
    const stateStart = {
      fieldCurrent: fieldData.fieldDefault.fieldCurrent,
      fieldDataPrev: fieldData.fieldDefault.fieldDataPrev,
      fieldDataPrev2: fieldData.fieldDefault.fieldDataPrev2,
      countStep: 0,
      start: true,
      finish: false,
      speed: 1,
    };
    expect(gameRdx(initialState, actions.startGame()).start).toBeTruthy();
    expect(gameRdx(finishState, actions.startGame())).toEqual(finishState);
    expect(gameRdx(stateStart, actions.pauseGame()).start).toBeFalsy();
    expect(gameRdx(finishState, actions.pauseGame())).toEqual(finishState);
  });

  it("action inc / dec velosity", () => {
    const stateIncVel = {
      fieldCurrent: fieldData.fieldDefault.fieldCurrent,
      fieldDataPrev: fieldData.fieldDefault.fieldDataPrev,
      fieldDataPrev2: fieldData.fieldDefault.fieldDataPrev2,
      countStep: 0,
      start: false,
      finish: false,
      speed: 1.5,
    };
    expect(gameRdx(initialState, actions.incVelosity()).speed).toEqual(
      stateIncVel.speed
    );
    expect(gameRdx(stateIncVel, actions.decVelosity).speed).toEqual(
      initialState.speed
    );
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
    expect(
      gameRdx(stateFinishDefault, actions.nextStepAction()).finish
    ).toBeTruthy();
    const stateFinishOneStep = {
      fieldCurrent: fieldData.fieldDataOneStep.fieldCurrent,
      fieldDataPrev: fieldData.fieldDataOneStep.fieldDataPrev,
      fieldDataPrev2: fieldData.fieldDataOneStep.fieldDataPrev2,
      countStep: 0,
      start: false,
      finish: true,
      speed: 101,
    };
    expect(
      gameRdx(stateFinishOneStep, actions.nextStepAction()).finish
    ).toBeTruthy();
    const stateFinishTwoStep = {
      fieldCurrent: fieldData.fieldDataTwoStep.fieldCurrent,
      fieldDataPrev: fieldData.fieldDataTwoStep.fieldDataPrev,
      fieldDataPrev2: fieldData.fieldDataTwoStep.fieldDataPrev2,
      countStep: 0,
      start: false,
      finish: true,
      speed: 101,
    };
    expect(
      gameRdx(stateFinishTwoStep, actions.nextStepAction()).finish
    ).toBeTruthy();
    expect(gameRdx(finishState, actions.nextStepAction())).toEqual(finishState);
  });

  it("action random field", () => {
    const spyRandom = jest.spyOn(funcOperation, "getRandomieDataField");
    spyRandom.mockReturnValue(fieldRandom);
    expect(
      gameRdx(initialState, actions.fillRandomField(30)).fieldCurrent
    ).toEqual(fieldRandom);
    expect(gameRdx(finishState, actions.fillRandomField(30))).toEqual(
      finishState
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
      speed: 1,
    };
    expect(gameRdx(stateToClear, actions.clearField())).toEqual({
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

    const stateStep1 = gameRdx(stateNextStep, actions.nextStepAction());
    expect(stateStep1.fieldCurrent).toEqual(
      fieldData.fieldDataTwoStep.fieldDataPrev
    );
    expect(stateStep1.finish).toBeFalsy();
    expect(gameRdx(stateStep1, actions.nextStepAction()).finish).toBeTruthy();
  });

  it("action resize", () => {
    expect(
      gameRdx(initialState, actions.resizeField({ sizeX: 3, sizeY: 3 }))
        .fieldCurrent
    ).toEqual(fieldResize);
    expect(
      gameRdx(finishState, actions.resizeField({ sizeX: 3, sizeY: 3 }))
    ).toEqual(finishState);
  });

  it("action clickCell", () => {
    expect(
      gameRdx(initialState, actions.clickOnCellAction({ x: 0, y: 0 }))
        .fieldCurrent
    ).toEqual(fieldClick);
    expect(
      gameRdx(finishState, actions.clickOnCellAction({ x: 0, y: 0 }))
    ).toEqual(finishState);
  });
  it("tests actions", () => {
    const stateRoot = store.getState();
    expect(selectField(stateRoot)).toEqual(initialState.fieldCurrent);
    expect(selectCountStep(stateRoot)).toEqual(initialState.countStep);
    expect(selectStart(stateRoot)).toEqual(initialState.start);
    expect(selectFinish(stateRoot)).toEqual(initialState.finish);
    expect(selectSpeed(stateRoot)).toEqual(initialState.speed);
  });
});
