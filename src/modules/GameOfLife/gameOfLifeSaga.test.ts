import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { select } from "redux-saga/effects";
import { call } from "redux-saga-test-plan/matchers";

import { actions, initialState } from "./gameRdx";
import {
  actions as actionsLogin,
  CheckState,
  initialState as userState,
} from "../../screens/Login/loginRdx";
import {
  dispatchNextStep,
  gameOfLifeSaga,
  loadGame,
  persistGame,
  saveGame,
  selector,
  startGame,
} from "./gameOfLifeSaga";
import reducer from "./gameRdx";
import { asyncStoreDAO } from "@/api/storeToLocalStorage/storeDAO";
import { store } from "@/rdx/store";

describe("Game Saga test", () => {
  it("check game saga", () => {
    return expectSaga(gameOfLifeSaga).fork(persistGame).run();
  });
  it("check load game success", () => {
    const actionlogin = { type: "user/login", payload: "user" };
    const stateLoad = { ...initialState, speed: 5 };
    return expectSaga(loadGame, actionlogin)
      .withReducer(reducer)
      .provide([[matchers.call.fn(asyncStoreDAO.loadState), stateLoad]])
      .put(actions.loadGame(stateLoad))
      .hasFinalState(stateLoad)
      .run();
  });
  it("check load game no user", () => {
    const actionlogin = { type: "user/login", payload: "" };
    return expectSaga(loadGame, actionlogin)
      .withReducer(reducer)
      .hasFinalState(initialState)
      .run();
  });
  it("check load game no data", () => {
    const actionlogin = { type: "user/login", payload: "user" };
    return expectSaga(loadGame, actionlogin)
      .withReducer(reducer)
      .provide([[matchers.call.fn(asyncStoreDAO.loadState), null]])
      .put(actionsLogin.loadData(CheckState["no data!"]))
      .run();
  });
  it("check save game", () => {
    const userName = "userName";
    return expectSaga(saveGame)
      .withReducer(reducer)
      .provide([
        [select(selector.user), { userName }],
        [select(selector.gameData), initialState],
        // [matchers.call.fn(asyncStoreDAO.saveState), ""],
      ])
      .call(asyncStoreDAO.saveState, userName, initialState)
      .run();
  });
  it("check save game no user", () => {
    return expectSaga(saveGame)
      .withReducer(reducer)
      .provide([
        [select(selector.user), { userName: "" }],
        [select(selector.gameData), initialState],
      ])
      .run();
  });
  it("check start game", () => {
    return expectSaga(startGame)
      .withReducer(reducer)
      .provide([[select(selector.gameData), { ...initialState, speed: 2 }]])
      .call(dispatchNextStep, 500)
      .run();
  });
  it("check start game no start", () => {
    const finshState = { ...initialState, finish: true };
    return expectSaga(startGame)
      .withReducer(reducer, finshState)
      .provide([[select(selector.gameData), finshState]])
      .hasFinalState(finshState)
      .run();
  });
  it("check perssistGame", () => {
    const nameUser = "userName";
    return expectSaga(persistGame)
      .dispatch(actionsLogin.login(nameUser))
      .call(loadGame, actionsLogin.login(nameUser))
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
      .provide([[select(selector.gameData), { ...initialState }]])
      .hasFinalState(initialState)
      .run();
  });
});
