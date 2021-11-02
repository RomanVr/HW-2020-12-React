import { Action } from "@/rdx";
import { AppDispatch, RootState } from "@/rdx/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  clickOnCell,
  generateDataField,
  getRandomieDataField,
  isFinish,
  nextStep,
  setNewSizeFieldData,
} from "./funcOperation";

// Очистить поле, остановить игру, удалить таймер вызова шага в middleware,
// очистить количество шагов, очистить финиш
export const CLEAR_FIELD = "CLEAR_FIELD";
// Если !финиш то: Изменить размер поля, остальное оставить как есть
export const RESIZE_FIELD = "RESIZE_FIELD";
// Если !финиш то: Пересчитать состояние поля, увеличить к-во шагов, остальное оставить как есть
export const NEXT_STEP = "NEXT_STEP";
// Если !финиш то: Пересчитать состояние поля рандомно, остальное оставить как есть
export const FILL_RANDOM_FIELD = "FILL_RANDOM_FIELD";
// Если !финиш то: Начать игру, запустить в таймер пересчет состояния поля в middleware
export const GAME_START = "GAME_START";
// Остановить игру, удалить таймер вызова шага в middleware,
export const GAME_PAUSE = "GAME_PAUSE";
// Если игра закончена то: записать финиш, остановить игру, удалить таймер вызова шага в middleware
export const GAME_CHECK_FINISH = "GAME_CHECK_FINISH";
// Если !финиш то: Изменить состояния ячейки в поле, остальное оставить как есть
export const CLICK_CELL = "CLICK_CELL";
// Увеличить / уменьшить скорость
export const INC_VELOSITY = "INC_VELOSITY";
export const DEC_VELOSITY = "DEC_VELOSITY";

export type GameState = {
  fieldCurrent: number[][];
  fieldDataPrev: number[][];
  fieldDataPrev2: number[][];
  countStep: number;
  start: boolean;
  finish: boolean;
  speed: number;
};

export const initialState: GameState = {
  fieldCurrent: new Array(10).fill(null).map(() => new Array(10).fill(0)),
  fieldDataPrev: new Array(10).fill(null).map(() => new Array(10).fill(0)),
  fieldDataPrev2: new Array(10).fill(null).map(() => new Array(10).fill(0)),
  countStep: 0,
  start: false,
  finish: false,
  speed: 100,
};

const startGame = createAsyncThunk<
  void,
  (arg: number) => void,
  {
    dispatch: AppDispatch;
    state: GameState;
  }
>("game/startGame", (setTimer, thunkAPI) => {
  const { speed } = thunkAPI.getState();
  setTimer(
    window.setInterval(
      () => thunkAPI.dispatch(gameSlice.actions.nextStepAction),
      speed
    )
  );
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clearField: (state, action: PayloadAction<number>) => {
      clearInterval(action.payload);
      state.start = false;
      state.countStep = 0;
      state.finish = false;
      state.fieldCurrent = generateDataField(
        state.fieldCurrent.length,
        state.fieldCurrent[0].length
      );
      state.fieldDataPrev = generateDataField(
        state.fieldDataPrev.length,
        state.fieldDataPrev[0].length
      );
      state.fieldDataPrev2 = generateDataField(
        state.fieldDataPrev2.length,
        state.fieldDataPrev2[0].length
      );
    },
    // startGame: (state, action: PayloadAction<(arg: number) => void>) => {
    //   if (!state.finish) {
    //     const speed = state.speed;
    //     action.payload(
    //       window.setInterval(() => {
    //         dispatch(nextStepAction());
    //       }, speed)
    //     );
    //     state.start = true;
    //   }
    // },
    pauseGame: (state) => {
      if (!state.finish) {
        state.start = false;
      }
    },
    fillRandomField: (state, action) => {
      if (!state.finish) {
        state.fieldCurrent = getRandomieDataField(
          state.fieldCurrent.length,
          state.fieldCurrent[0].length,
          action.payload
        );
        state.fieldDataPrev = generateDataField(
          state.fieldCurrent.length,
          state.fieldCurrent[0].length
        );
        state.fieldDataPrev2 = generateDataField(
          state.fieldCurrent.length,
          state.fieldCurrent[0].length
        );
      }
    },
    resizeField: (state, action) => {
      if (!state.finish) {
        state.fieldCurrent = setNewSizeFieldData(
          state.fieldCurrent,
          action.payload.sizeX,
          action.payload.sizeY
        );
        state.fieldDataPrev = setNewSizeFieldData(
          state.fieldDataPrev,
          action.payload.sizeX,
          action.payload.sizeY
        );
        state.fieldDataPrev2 = setNewSizeFieldData(
          state.fieldDataPrev2,
          action.payload.sizeX,
          action.payload.sizeY
        );
      }
    },
    nextStepAction: (state) => {
      if (!state.finish) {
        const { fieldCurrent, fieldDataPrev, fieldDataPrev2 } = nextStep(
          state.fieldCurrent,
          state.fieldDataPrev
        );
        state.fieldCurrent = fieldCurrent;
        state.fieldDataPrev = fieldDataPrev;
        state.fieldDataPrev2 = fieldDataPrev2;
      }
    },
    checkFinish: (state) => {
      if (
        isFinish(state.fieldCurrent, state.fieldDataPrev, state.fieldDataPrev2)
      ) {
        state.finish = true;
        state.start = false;
      }
    },
    clickOnCellAction: (state, action) => {
      if (!state.finish) {
        state.fieldCurrent = clickOnCell(
          state.fieldCurrent,
          action.payload.x,
          action.payload.y
        );
      }
    },
    incVelosity: (state) => {
      state.speed = state.speed + 1;
    },
    decVelosity: (state) => {
      state.speed = state.speed - 1;
    },
  },
});

export default gameSlice.reducer;

export const {
  clearField,
  pauseGame,
  fillRandomField,
  resizeField,
  nextStepAction,
  checkFinish,
  clickOnCellAction,
  incVelosity,
  decVelosity,
} = gameSlice.actions;

export const selectField = (state: RootState): number[][] =>
  state.gameData.fieldCurrent;
export const selectCountStep = (state: RootState): number =>
  state.gameData.countStep;
export const selectStart = (state: RootState): boolean => state.gameData.start;
export const selectFinish = (state: RootState): boolean =>
  state.gameData.finish;
export const selectSpeed = (state: RootState): number => state.gameData.speed;



export function actionpauseGame(
  timerStep: number
): ThunkAction<void, RootState, unknown, AnyAction> {
  const actionPauseGame = (dispatch: Dispatch<Action>) => {
    dispatch({ type: GAME_PAUSE });
    clearInterval(timerStep);
  };
  return actionPauseGame;
}
export function actionfillRandomField(rndRate: number): Action {
  return {
    type: FILL_RANDOM_FIELD,
    payload: rndRate,
  };
}
export function actionresizeField(sizeX: number, sizeY: number): Action {
  return {
    type: RESIZE_FIELD,
    payload: { sizeX, sizeY },
  };
}
export function actionnextStepAction(): Action {
  return { type: NEXT_STEP };
}
export function actioncheckFinish(): Action {
  return { type: GAME_CHECK_FINISH };
}
export function actionclickOnCellAction(x: number, y: number): Action {
  return {
    type: CLICK_CELL,
    payload: { x, y },
  };
}
export function actionincVelosity(): Action {
  return { type: INC_VELOSITY };
}
export function actiondecVelosity(): Action {
  return { type: DEC_VELOSITY };
}
