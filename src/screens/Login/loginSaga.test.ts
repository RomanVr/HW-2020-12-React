import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { call } from "redux-saga/effects";

import reducer, { actions, CheckState } from "./loginRdx";
import {
  checkUserSession,
  clearUserSession,
  loginSaga,
  saveUserSession,
} from "./loginSaga";
import { asyncAuthLocalStorage } from "@/api/authLocalStorage/auth";

describe("Login saga test", () => {
  it("check login saga", () => {
    return expectSaga(loginSaga)
      .withReducer(reducer)
      .provide([[matchers.fork.fn(checkUserSession), ""]])
      .fork(checkUserSession)
      .run();
  });
  it("check save user session", () => {
    const userSession = "UserName";
    return expectSaga(saveUserSession, {
      type: actions.login.type,
      payload: userSession,
    })
      .call(asyncAuthLocalStorage.login, userSession)
      .run();
  });
  it("check save user session empty", () => {
    const userSession = "";
    return expectSaga(saveUserSession, {
      type: actions.login.type,
      payload: userSession,
    }).run();
  });
  it("check clear user session", () => {
    return expectSaga(clearUserSession)
      .call(asyncAuthLocalStorage.logout)
      .run();
  });
  it("check user session success", () => {
    const userSession = "Username";
    return expectSaga(checkUserSession)
      .withReducer(reducer)
      .provide([[call(asyncAuthLocalStorage.getUserSession), userSession]])
      .put(actions.login(userSession))
      .hasFinalState({
        userName: userSession,
        statusUser: CheckState.succeed,
      })
      .run();
  });
  it("check user session fail", () => {
    const userSession = "";
    return expectSaga(checkUserSession)
      .withReducer(reducer)
      .provide([[call(asyncAuthLocalStorage.getUserSession), userSession]])
      .put(actions.logout())
      .hasFinalState({
        userName: userSession,
        statusUser: CheckState.failed,
      })
      .run();
  });
});
