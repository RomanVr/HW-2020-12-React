import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";

import { actions, initialState } from "./gameRdx";
import { gameOfLifeSaga, loadGame, perssistGame } from "./gameOfLifeSaga";
import reducer from "./gameRdx";
import { asyncStoreDAO } from "@/api/storeToLocalStorage/storeDAO";

describe("Game Saga test", () => {
  it("check game saga", () => {
    return expectSaga(gameOfLifeSaga).fork(perssistGame).run();
  });

  it("check load game", () => {
    const actionlogin = { type: "user/login", payload: "user" };
    return expectSaga(loadGame, actionlogin)
      .withReducer(reducer)
      .provide([[matchers.call.fn(asyncStoreDAO.loadState), initialState]])
      .put(actions.loadGame(initialState))
      .hasFinalState({ ...initialState })
      .run();
  });
});
