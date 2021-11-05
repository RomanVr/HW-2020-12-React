import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/rdx/store";
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

export const size = { x: 15, y: 20 };

export const initialState: GameState = {
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
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    loadGame: (state, action) => {
      state.speed = action.payload.speed;
      state.countStep = action.payload.countStep;
      state.finish = action.payload.finish;
      state.start = action.payload.start;
      state.fieldCurrent = action.payload.fieldCurrent;
      state.fieldDataPrev = action.payload.fieldDataPrev;
      state.fieldDataPrev2 = action.payload.fieldDataPrev2;
    },
    clearField: (state) => {
      state.start = false;
      state.countStep = 0;
      state.finish = false;
      state.speed = 1;
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
    startGame: (state) => {
      if (!state.finish) {
        state.start = true;
      }
    },
    pauseGame: (state) => {
      state.start = false;
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
        state.countStep += 1;
        if (
          isFinish(
            state.fieldCurrent,
            state.fieldDataPrev,
            state.fieldDataPrev2
          )
        ) {
          state.finish = true;
        }
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
      state.speed = state.speed + 0.5;
    },
    decVelosity: (state) => {
      state.speed = state.speed - 0.5;
    },
  },
});

export default gameSlice.reducer;
export type TypeGameState = ReturnType<typeof gameSlice.reducer>;

export const { actions } = gameSlice;

export const selectField = (state: RootState): number[][] =>
  state.gameData.fieldCurrent;
export const selectCountStep = (state: RootState): number =>
  state.gameData.countStep;
export const selectStart = (state: RootState): boolean => state.gameData.start;
export const selectFinish = (state: RootState): boolean =>
  state.gameData.finish;
export const selectSpeed = (state: RootState): number => state.gameData.speed;
