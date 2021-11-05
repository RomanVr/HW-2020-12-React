import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";

import gameReducer from "@/modules/GameOfLife/gameRdx";
import userReducer from "@/screens/Login/loginRdx";
import { loginSaga } from "@/screens/Login/loginSaga";
import { gameOfLifeSaga } from "@/modules/GameOfLife/gameOfLifeSaga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield fork(loginSaga);
  yield fork(gameOfLifeSaga);
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    gameData: gameReducer,
  },
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
