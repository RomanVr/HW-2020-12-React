import { Action } from "@/rdx";
import { State } from "@/rdx/store";
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

export type StateGame = {
  fieldCurrent: number[][];
  fieldDataPrev: number[][];
  fieldDataPrev2: number[][];
  countStep: number;
  start: boolean;
  finish: boolean;
  speed: number;
};

export const initialState = {
  fieldCurrent: new Array(10).fill(null).map(() => new Array(10).fill(0)),
  fieldDataPrev: new Array(10).fill(null).map(() => new Array(10).fill(0)),
  fieldDataPrev2: new Array(10).fill(null).map(() => new Array(10).fill(0)),
  countStep: 0,
  start: false,
  finish: false,
  speed: 100,
};

export default function reducer(
  state: StateGame = initialState,
  action: AnyAction
): StateGame {
  switch (action.type) {
    case FILL_RANDOM_FIELD:
      if (!state.finish) {
        return {
          ...state,
          fieldCurrent: getRandomieDataField(
            state.fieldCurrent.length,
            state.fieldCurrent[0].length,
            action.payload
          ),
          fieldDataPrev: generateDataField(
            state.fieldCurrent.length,
            state.fieldCurrent[0].length
          ),
          fieldDataPrev2: generateDataField(
            state.fieldCurrent.length,
            state.fieldCurrent[0].length
          ),
        };
      }
      return state;
    case RESIZE_FIELD:
      if (!state.finish) {
        return {
          ...state,
          fieldCurrent: setNewSizeFieldData(
            state.fieldCurrent,
            action.payload.sizeX,
            action.payload.sizeY
          ),
          fieldDataPrev: setNewSizeFieldData(
            state.fieldDataPrev,
            action.payload.sizeX,
            action.payload.sizeY
          ),
          fieldDataPrev2: setNewSizeFieldData(
            state.fieldDataPrev2,
            action.payload.sizeX,
            action.payload.sizeY
          ),
        };
      }
      return state;
    case CLEAR_FIELD:
      return {
        speed: state.speed,
        start: false,
        countStep: 0,
        finish: false,
        fieldCurrent: generateDataField(
          state.fieldCurrent.length,
          state.fieldCurrent[0].length
        ),
        fieldDataPrev: generateDataField(
          state.fieldDataPrev.length,
          state.fieldDataPrev[0].length
        ),
        fieldDataPrev2: generateDataField(
          state.fieldDataPrev2.length,
          state.fieldDataPrev2[0].length
        ),
      };
    case NEXT_STEP:
      if (!state.finish) {
        return {
          ...state,
          ...nextStep(state.fieldCurrent, state.fieldDataPrev),
        };
      }
      return state;
    case GAME_START:
      if (!state.finish) {
        return {
          ...state,
          start: true,
        };
      }
      return state;
    case GAME_PAUSE:
      if (!state.finish) {
        return {
          ...state,
          start: false,
        };
      }
      return state;
    case GAME_CHECK_FINISH:
      if (
        isFinish(state.fieldCurrent, state.fieldDataPrev, state.fieldDataPrev2)
      ) {
        return {
          ...state,
          finish: true,
          start: false,
        };
      }
      return state;
    case CLICK_CELL:
      if (!state.finish) {
        return {
          ...state,
          fieldCurrent: clickOnCell(
            state.fieldCurrent,
            action.payload.x,
            action.payload.y
          ),
        };
      }
      return state;
    case INC_VELOSITY:
      return {
        ...state,
        speed: state.speed + 1,
      };
    case DEC_VELOSITY:
      return {
        ...state,
        speed: state.speed - 1,
      };
    default:
      return state;
  }
}
//middleware удалить таймер вызова шага
export function clearField(
  // eslint-disable-next-line no-undef
  timerStep: NodeJS.Timeout
): ThunkAction<void, State, unknown, AnyAction> {
  const actionClearField = (dispatch: Dispatch<Action>) => {
    dispatch({ type: CLEAR_FIELD });
    clearInterval(Number(timerStep));
  };
  return actionClearField;
}
export function startGame(
  // eslint-disable-next-line no-undef
  setTimer: (timer: NodeJS.Timeout) => void
): ThunkAction<void, State, unknown, AnyAction> {
  const actionStart = (dispatch: Dispatch<Action>, getState: () => State) => {
    dispatch({ type: GAME_START });
    const speed = getState().gameData.speed;
    setTimer(
      setInterval(() => {
        dispatch(nextStepAction());
      }, speed)
    );
  };
  return actionStart;
}
export function pauseGame(
  // eslint-disable-next-line no-undef
  timerStep: NodeJS.Timeout
): ThunkAction<void, State, unknown, AnyAction> {
  const actionPauseGame = (dispatch: Dispatch<Action>) => {
    dispatch({ type: GAME_PAUSE });
    clearInterval(Number(timerStep));
  };
  return actionPauseGame;
}
export function fillRandomField(rndRate: number): Action {
  return {
    type: FILL_RANDOM_FIELD,
    payload: rndRate,
  };
}
export function resizeField(sizeX: number, sizeY: number): Action {
  return {
    type: RESIZE_FIELD,
    payload: { sizeX, sizeY },
  };
}
export function nextStepAction(): Action {
  return { type: NEXT_STEP };
}
export function checkFinish(): Action {
  return { type: GAME_CHECK_FINISH };
}
export function clickOnCellAction(x: number, y: number): Action {
  return {
    type: CLICK_CELL,
    payload: { x, y },
  };
}
export function incVelosity(): Action {
  return { type: INC_VELOSITY };
}
export function decVelosity(): Action {
  return { type: DEC_VELOSITY };
}
