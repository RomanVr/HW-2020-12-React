import { configureStore } from "@reduxjs/toolkit";
import gameReducer, { size } from "@/modules/GameOfLife/gameRdx";
import userReducer, { CheckState } from "@/screens/Login/loginRdx";

export const defaultState = {
  user: {
    userName: "",
    statusUser: CheckState.initiated,
  },
  gameData: {
    fieldCurrent: new Array(size.x)
      .fill(null)
      .map(() => new Array(size.y).fill(0)),
    fieldDataPrev: new Array(size.x)
      .fill(null)
      .map(() => new Array(size.y).fill(0)),
    fieldDataPrev2: new Array(size.x)
      .fill(null)
      .map(() => new Array(size.y).fill(0)),
    countStep: 0,
    start: false,
    finish: false,
    speed: 1, // per seconds
    timerStep: 0,
  },
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    gameData: gameReducer,
  },
  devTools: true,
  preloadedState: defaultState,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
