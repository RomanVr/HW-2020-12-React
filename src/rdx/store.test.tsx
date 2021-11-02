import {
  defaultState,
  loadStateAction,
  // RootState,
  store as storeRdx,
} from "./store";
// import { clearField, pauseGame, startGame } from "@/modules/GameOfLife/gameRdx";
import { act } from "@testing-library/react";

describe("Test store", () => {
  // it("default state", () => {
  //   expect(storeRdx.getState()).toEqual(defaultState);
  // });

  // it("action start", () => {
  //   const mockSetTimer = jest.fn();
  //   storeRdx.dispatch(startGame(mockSetTimer));
  //   expect(mockSetTimer).toBeCalled();
  // });

  // it("action start / pause", () => {
  //   jest.useFakeTimers();
  //   let timerStep: number = window.setTimeout(() => {
  //     0;
  //   }, 0);
  //   const setTimer = (timer: number) => {
  //     timerStep = timer;
  //   };
  //   storeRdx.dispatch(startGame(setTimer));
  //   act(() => {
  //     jest.advanceTimersByTime(500);
  //   });
  //   expect((storeRdx.getState() as RootState).gameData.start).toBeTruthy();
  //   storeRdx.dispatch(pauseGame(timerStep));
  //   expect((storeRdx.getState() as RootState).gameData.start).toBeFalsy();
  // });

  // it("action start / clear", () => {
  //   let timerStep: number = window.setTimeout(() => {
  //     0;
  //   }, 0);
  //   const setTimer = (timer: number) => {
  //     timerStep = timer;
  //   };
  //   storeRdx.dispatch(startGame(setTimer));
  //   expect((storeRdx.getState() as RootState).gameData.start).toBeTruthy();
  //   storeRdx.dispatch(clearField(timerStep));
  //   expect((storeRdx.getState() as RootState).gameData.start).toBeFalsy();
  // });

  it("action loadState", () => {
    jest.useFakeTimers();
    const getItemFn = jest.spyOn(window.localStorage.__proto__, "getItem");
    getItemFn.mockReturnValue(JSON.stringify(defaultState));
    // const consoleMock = jest.fn();
    storeRdx.dispatch(loadStateAction(console.log));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    // expect(consoleMock.mock.calls.length).toBe(1);
  });
});
