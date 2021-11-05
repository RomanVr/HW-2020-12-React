import { takeEvery, select, call, put, fork, take } from "redux-saga/effects";
import { RootState } from "@/rdx/store";
import { actions, GameState } from "./gameRdx";
import { actions as actionLogin } from "@/screens/Login/loginRdx";
import { sleep } from "@/utils/sleep";
import { UserState } from "@/screens/Login/loginRdx";
import { asyncStoreDAO } from "@/api/storeToLocalStorage/storeDAO";

const selectorGameData = {
  gameData: ({ gameData }: RootState) => gameData,
  user: ({ user }: RootState) => user,
};

function* dispatchNextStep(timeToMillisec: number) {
  const gameData: GameState = yield select(selectorGameData.gameData);
  if (gameData.start) {
    yield put(actions.nextStepAction());
    yield sleep(timeToMillisec);
    yield call(dispatchNextStep, timeToMillisec);
  }
}

function* startGame() {
  const gameData: GameState = yield select(selectorGameData.gameData);
  if (!gameData.finish) {
    const timeToMillisec = Math.floor(1000 / gameData.speed);
    yield call(dispatchNextStep, timeToMillisec);
  }
}

function* perssistGame() {
  yield take(actionLogin.login.type);
  const user: UserState = yield select(selectorGameData.user);
  if (user.userName) {
    const stateLoad: GameState = yield asyncStoreDAO.loadState(user.userName);
    yield put(actions.loadGame(stateLoad));
  }
}

function* saveGame() {
  const gameData: GameState = yield select(selectorGameData.gameData);
  const user: UserState = yield select(selectorGameData.user);
  if (user.userName) {
    yield asyncStoreDAO.saveState(user.userName, gameData);
  }
}

export function* gameOfLifeSaga(): Generator {
  yield fork(perssistGame);
  yield takeEvery(actions.startGame.type, startGame);
  yield takeEvery("saveGame", saveGame);
}
