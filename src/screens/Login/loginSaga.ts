import { call, fork, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { asyncAuthLocalStorage } from "@/api/authLocalStorage/auth";
import { actions } from "./loginRdx";

const userNameMinLength = 4;

export function* checkUserSession() {
  const userSession: string = yield call(asyncAuthLocalStorage.getUserSession);
  if (userSession && userSession.length > userNameMinLength) {
    yield put(actions.login(userSession));
  } else {
    yield put(actions.logout());
  }
}

export function* clearUserSession(): Generator {
  yield call(asyncAuthLocalStorage.logout);
}

export function* saveUserSession(action: PayloadAction<string>): Generator {
  const userName = action.payload;
  if (userName?.length > userNameMinLength) {
    yield call(asyncAuthLocalStorage.login, userName);
  }
}

export function* loginSaga(): Generator {
  yield fork(checkUserSession);
  yield takeEvery(actions.login.type, saveUserSession);
  yield takeEvery(actions.logout.type, clearUserSession);
}
