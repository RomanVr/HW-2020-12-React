import { AppDispatch, RootState } from "@/rdx/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clickOnCell,
  generateDataField,
  getRandomieDataField,
  isFinish,
  nextStep,
  setNewSizeFieldData,
} from "./funcOperation";

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

export const startGameActionCreator = createAsyncThunk<
  // call startGameActionCreator(setTimer)
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
      () => thunkAPI.dispatch(gameSlice.actions.nextStepAction()),
      speed
    )
  );
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clearField: (state, action: PayloadAction<number>) => {
      window.clearInterval(action.payload);
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
