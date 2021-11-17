import {
  takeEvery,
  select,
  call,
  put,
  fork,
  take,
  PutEffect,
  CallEffect,
  SelectEffect,
  TakeEffect,
} from "redux-saga/effects";

import { RootState } from "@/rdx/store";
import { actions, GameState } from "./gameRdx";
import { sleep } from "@/utils/sleep";
import {
  UserState,
  actions as actionLogin,
} from "../../screens/Login/loginRdx";
import { asyncStoreDAO } from "@/api/storeToLocalStorage/storeDAO";
import { PayloadAction } from "@reduxjs/toolkit";

export const selector = {
  gameData: ({ gameData }: RootState): GameState => gameData,
  user: ({ user }: RootState): UserState => user,
};

export function* dispatchNextStep(timeToMillisec: number): Generator<
  | SelectEffect
  | CallEffect
  | PutEffect<{
      payload: any;
      type: string;
    }>
  | Promise<() => void>,
  void,
  GameState & undefined
> {
  const gameData: GameState = yield select(selector.gameData);
  if (gameData.start) {
    yield put(actions.nextStepAction());
    yield sleep(timeToMillisec);
    yield call(dispatchNextStep, timeToMillisec);
  }
}

export function* startGame(): Generator<
  SelectEffect | CallEffect,
  void,
  GameState
> {
  const gameData: GameState = yield select(selector.gameData);
  if (!gameData.finish) {
    const timeToMillisec = Math.floor(1000 / gameData.speed);
    yield call(dispatchNextStep, timeToMillisec);
  }
}

export function* persistGame(): Generator<
  SelectEffect | CallEffect | TakeEffect,
  void,
  PayloadAction<string>
> {
  const action: PayloadAction<string> = yield take(actionLogin.login.type);
  yield call(loadGame, action);
}

export function* loadGame({
  payload: userName,
}: PayloadAction<string>): Generator<
  | CallEffect<GameState>
  | PutEffect<{
      payload: any;
      type: string;
    }>,
  void,
  GameState
> {
  if (userName) {
    try {
      const stateLoad: GameState = yield call(
        asyncStoreDAO.loadState,
        userName
      );
      yield put(actions.loadGame(stateLoad));
    } catch (e) {
      console.log(`error load: ${e}`);
    }
  }
}

export function* saveGame(): Generator<
  SelectEffect | CallEffect,
  void,
  GameState & UserState
> {
  const gameData: GameState = yield select(selector.gameData);
  const user: UserState = yield select(selector.user);
  if (user.userName) {
    yield call(asyncStoreDAO.saveState, user.userName, gameData);
  }
}

export function* gameOfLifeSaga(): Generator {
  yield fork(persistGame);
  yield takeEvery(actions.startGame.type, startGame);
  yield takeEvery(actionLogin.login.type, loadGame);
  yield takeEvery("saveGame", saveGame);
}
