import { defaultState, State, store as storeRdx } from "./store";
import { clearField, pauseGame, startGame } from "@/modules/GameOfLife/gameRdx";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { act } from "@testing-library/react";

describe("Test store", () => {
  it("default state", () => {
    expect(storeRdx.getState()).toEqual(defaultState);
  });

  it("action start", () => {
    const mockSetTimer = jest.fn();
    (storeRdx.dispatch as ThunkDispatch<State, unknown, AnyAction>)(
      startGame(mockSetTimer)
    );
    expect(mockSetTimer).toBeCalled();
  });

  it("action start / pause", () => {
    jest.useFakeTimers();
    // eslint-disable-next-line no-undef
    let timerStep: NodeJS.Timeout = setTimeout(() => {
      0;
    }, 0);
    // eslint-disable-next-line no-undef
    const setTimer = (timer: NodeJS.Timeout) => {
      timerStep = timer;
    };
    storeRdx.dispatch(startGame(setTimer));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect((storeRdx.getState() as State).gameData.start).toBeTruthy();
    storeRdx.dispatch(pauseGame(timerStep));
    expect((storeRdx.getState() as State).gameData.start).toBeFalsy();
  });

  it("action start / clear", () => {
    // eslint-disable-next-line no-undef
    let timerStep: NodeJS.Timeout = setTimeout(() => {
      0;
    }, 0);
    // eslint-disable-next-line no-undef
    const setTimer = (timer: NodeJS.Timeout) => {
      timerStep = timer;
    };
    storeRdx.dispatch(startGame(setTimer));
    expect((storeRdx.getState() as State).gameData.start).toBeTruthy();
    storeRdx.dispatch(clearField(timerStep));
    expect((storeRdx.getState() as State).gameData.start).toBeFalsy();
  });
});
