import { takeEvery, select, call, put, fork, take } from "redux-saga/effects";

import { RootState } from "@/rdx/store";
import { actions, GameState } from "./gameRdx";
import { actions as actionLogin } from "@/screens/Login/loginRdx";
import { sleep } from "@/utils/sleep";
import { UserState } from "@/screens/Login/loginRdx";
import { asyncStoreDAO } from "@/api/storeToLocalStorage/storeDAO";
import { PayloadAction } from "@reduxjs/toolkit";

const selector = {
  gameData: ({ gameData }: RootState) => gameData,
  user: ({ user }: RootState) => user,
};

function* dispatchNextStep(timeToMillisec: number) {
  const gameData: GameState = yield select(selector.gameData);
  if (gameData.start) {
    yield put(actions.nextStepAction());
    yield sleep(timeToMillisec);
    yield call(dispatchNextStep, timeToMillisec);
  }
}

function* startGame() {
  const gameData: GameState = yield select(selector.gameData);
  if (!gameData.finish) {
    const timeToMillisec = Math.floor(1000 / gameData.speed);
    yield call(dispatchNextStep, timeToMillisec);
  }
}

export function* perssistGame() {
  const action: PayloadAction<string> = yield take(actionLogin.login.type);
  console.log(`perssistGame action: ${JSON.stringify(action)}`);
  yield* loadGame(action);
}

export function* loadGame({ payload: userName }: PayloadAction<string>) {
  if (userName) {
    try {
      const stateLoad: GameState = yield asyncStoreDAO.loadState(userName);
      console.log(`loadGame stateLoad: ${stateLoad}`);
      yield put(actions.loadGame(stateLoad));
    } catch (e) {
      console.log(`error load: ${e}`);
    }
  }
}

function* saveGame() {
  const gameData: GameState = yield select(selector.gameData);
  const user: UserState = yield select(selector.user);
  if (user.userName) {
    yield asyncStoreDAO.saveState(user.userName, gameData);
  }
}

export function* gameOfLifeSaga(): Generator {
  yield fork(perssistGame);
  yield takeEvery(actions.startGame.type, startGame);
  yield takeEvery(actionLogin.login.type, loadGame);
  yield takeEvery("saveGame", saveGame);
}
