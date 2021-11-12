import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { select } from "redux-saga/effects";
import { call } from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";

import { actions, initialState } from "./gameRdx";
import {
  actions as actionsLogin,
  CheckState,
  initialState as userState,
} from "@/screens/Login/loginRdx";
import {
  dispatchNextStep,
  gameOfLifeSaga,
  loadGame,
  perssistGame,
  saveGame,
  selector,
  startGame,
} from "./gameOfLifeSaga";
import reducer from "./gameRdx";
import { asyncStoreDAO } from "@/api/storeToLocalStorage/storeDAO";
import { store } from "@/rdx/store";

describe("Game Saga test", () => {
  it("check game saga", () => {
    return expectSaga(gameOfLifeSaga).fork(perssistGame).run();
  });
  it("check load game success", () => {
    const actionlogin = { type: "user/login", payload: "user" };
    return expectSaga(loadGame, actionlogin)
      .withReducer(reducer)
      .provide([[matchers.call.fn(asyncStoreDAO.loadState), initialState]])
      .put(actions.loadGame(initialState))
      .hasFinalState({ ...initialState })
      .run();
  });
  it("check load game no user", () => {
    const actionlogin = { type: "user/login", payload: "" };
    return expectSaga(loadGame, actionlogin)
      .withReducer(reducer)
      .provide([[matchers.call.fn(asyncStoreDAO.loadState), initialState]])
      .hasFinalState({ ...initialState })
      .run();
  });
  it("check load game no data", () => {
    const actionlogin = { type: "user/login", payload: "user" };
    const error = new Error("Error!");
    return expectSaga(loadGame, actionlogin)
      .withReducer(reducer)
      .provide([[matchers.call.fn(asyncStoreDAO.loadState), throwError(error)]])
      .run();
  });
  it("check save game", () => {
    return expectSaga(saveGame)
      .withReducer(reducer)
      .provide([
        [select(selector.user), { userName: "userName" }],
        [select(selector.gameData), initialState],
        [matchers.call.fn(asyncStoreDAO.saveState), ""],
      ])
      .run();
  });
  it("check save game no user", () => {
    return expectSaga(saveGame)
      .withReducer(reducer)
      .provide([
        [select(selector.user), { userName: "" }],
        [select(selector.gameData), initialState],
        [matchers.call.fn(asyncStoreDAO.saveState), ""],
      ])
      .run();
  });
  it("check start game", () => {
    return expectSaga(startGame)
      .withReducer(reducer)
      .provide([[select(selector.gameData), initialState]])
      .call(dispatchNextStep, 1000)
      .run();
  });
  it("check start game no start", () => {
    return expectSaga(startGame)
      .withReducer(reducer)
      .provide([[select(selector.gameData), { ...initialState, finish: true }]])
      .run();
  });
  it("check perssistGame", () => {
    return expectSaga(perssistGame)
      .dispatch(actionsLogin.login("userName"))
      .run();
  });
  it("check selector", () => {
    expect(selector.gameData(store.getState())).toEqual(initialState);
    expect(selector.user(store.getState())).toEqual({
      ...userState,
      statusUser: CheckState.failed,
    });
  });
  it("check dispatchNextStep", () => {
    return expectSaga(dispatchNextStep, 100)
      .withReducer(reducer)
      .provide([
        [select(selector.gameData), { ...initialState, start: true }],
        [matchers.call.fn(dispatchNextStep), ""],
        [call(dispatchNextStep, 100), ""],
      ])
      .put(actions.nextStepAction())
      .run();
  });
  it("check dispatchNextStep no start", () => {
    return expectSaga(dispatchNextStep, 1000)
      .withReducer(reducer)
      .provide([[select(selector.gameData), { ...initialState, start: false }]])
      .run();
  });
});
