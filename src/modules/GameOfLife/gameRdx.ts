import { asyncStoreDAO } from "@/api/storeToLocalStorage/storeDAO";
import { AppDispatch, RootState } from "@/rdx/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  timerStep: number;
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
  speed: 1,
  timerStep: 0,
};

export const startGameActionCreator = createAsyncThunk<
  // call startGameActionCreator(setTimer)
  number,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("game/startGame", (_, thunkAPI) => {
  const { finish, speed } = thunkAPI.getState().gameData;
  if (!finish) {
    const timeToMillisec = Math.floor(1000 / speed);
    return window.setInterval(
      () => thunkAPI.dispatch(gameSlice.actions.nextStepAction()),
      timeToMillisec
    );
  } else {
    return thunkAPI.rejectWithValue("");
  }
});

export const saveStateToLS_ActionCreator = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("game/saveState", async (userName, thunkAPI) => {
  const { gameData } = thunkAPI.getState();
  try {
    return await asyncStoreDAO.saveState(userName, gameData);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const loadStateFromLS_ActionCreator = createAsyncThunk<
  GameState,
  string
>("game/loadState", async (userName, thunkAPI) => {
  try {
    const stateLoad = await asyncStoreDAO.loadState(userName);
    return stateLoad;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clearField: (state) => {
      window.clearInterval(state.timerStep);
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
    pauseGame: (state) => {
      state.start = false;
      if (!state.finish) {
        window.clearInterval(state.timerStep);
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
  extraReducers: (builder) => {
    builder.addCase(startGameActionCreator.fulfilled, (state, action) => {
      state.start = !state.start;
      state.timerStep = action.payload;
    });
    builder.addCase(
      loadStateFromLS_ActionCreator.fulfilled,
      (state, action) => {
        state.speed = action.payload.speed;
        state.countStep = action.payload.countStep;
        state.finish = action.payload.finish;
        state.start = action.payload.start;
        state.fieldCurrent = action.payload.fieldCurrent;
        state.fieldDataPrev = action.payload.fieldDataPrev;
        state.fieldDataPrev2 = action.payload.fieldDataPrev2;
      }
    );
    builder.addCase(loadStateFromLS_ActionCreator.rejected, (state, action) => {
      console.log("rejected: ", action.payload);
    });
  },
});

export default gameSlice.reducer;
export type TypeGameState = ReturnType<typeof gameSlice.reducer>;

export const {
  clearField,
  pauseGame,
  fillRandomField,
  resizeField,
  nextStepAction,
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
export const selectTimerStep = (state: RootState): number =>
  state.gameData.timerStep;
