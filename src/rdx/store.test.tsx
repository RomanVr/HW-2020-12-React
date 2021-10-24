import { defaultState, State, store } from "./store";
import { Store } from "redux";
import { clearField, pauseGame, startGame } from "@/modules/GameOfLife/gameRdx";
import { ActionFunc } from "./actiontypes";

describe("Test store", () => {
  let storeRdx: Store;

  beforeEach(() => {
    storeRdx = store;
  });

  it("default state", () => {
    expect(storeRdx.getState()).toEqual(defaultState);
  });

  it("action start", () => {
    const mockSetTimer = jest.fn();
    storeRdx.dispatch<ActionFunc>(startGame(mockSetTimer));
    expect(mockSetTimer).toBeCalled();
  });

  it("action start / pause", () => {
    let timerStep: NodeJS.Timeout;
    const setTimer = (timer: any) => {
      timerStep = timer;
    };
    storeRdx.dispatch<ActionFunc>(startGame(setTimer));
    expect((storeRdx.getState() as State).gameData.start).toBeTruthy();
    storeRdx.dispatch<ActionFunc>(pauseGame(timerStep));
    expect((storeRdx.getState() as State).gameData.start).toBeFalsy();
  });

  it("action start / clear", () => {
    let timerStep: NodeJS.Timeout;
    const setTimer = (timer: any) => {
      timerStep = timer;
    };
    storeRdx.dispatch<ActionFunc>(startGame(setTimer));
    expect((storeRdx.getState() as State).gameData.start).toBeTruthy();
    storeRdx.dispatch<ActionFunc>(clearField(timerStep));
    expect((storeRdx.getState() as State).gameData.start).toBeFalsy();
  });
});
