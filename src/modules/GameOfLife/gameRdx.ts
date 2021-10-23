import { Action } from "@/rdx";
import { State } from "@/rdx/store";
import { Dispatch } from "react";

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

type StateLogin = {
  fieldCurrent: number[][];
  fieldDataPrev: number[][];
  fieldDataPrev2: number[][];
  countStep: number;
  start: boolean;
  finish: boolean;
  speed: number;
};

const initialState = {
  fieldCurrent: new Array(10).fill(null).map(() => new Array(10).fill(0)),
  fieldDataPrev: new Array(10).fill(null).map(() => new Array(10).fill(0)),
  fieldDataPrev2: new Array(10).fill(null).map(() => new Array(10).fill(0)),
  countStep: 0,
  start: false,
  finish: false,
  speed: 100,
};

export default function reducer(
  state: StateLogin = initialState,
  action: Action
): StateLogin {
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
          ...clickOnCell(
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
): (dispatch: Dispatch<Action>) => void {
  const actionClearField = (dispatch: Dispatch<Action>) => {
    dispatch({ type: CLEAR_FIELD });
    clearInterval(Number(timerStep));
  };
  return actionClearField;
}
export function startGame(
  // eslint-disable-next-line no-undef
  setTimer: (timer: NodeJS.Timeout) => number
): (dispatch: Dispatch<Action>, getState: () => State) => void {
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
): (dispatch: Dispatch<Action>) => void {
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
    type: FILL_RANDOM_FIELD,
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

function getRandomieDataField(
  sizeX: number,
  sizeY: number,
  rndRrate: number
): number[][] {
  const newFieldData = new Array(sizeX)
    .fill(null)
    .map(() => new Array(sizeY).fill(0));

  const rndCellOnY = (sizeY * rndRrate) / 100;
  let rndCounter = 0;
  const setElementJ: Set<number> = new Set([]);
  for (let i = 0; i < sizeX; i += 1) {
    while (rndCounter < rndCellOnY) {
      const j = Math.round(Math.random() * (sizeY + 1));
      if (!setElementJ.has(j) && j < sizeY) {
        setElementJ.add(j);
        rndCounter += 1;
        newFieldData[i][j] = 1;
      }
    }
    setElementJ.clear();
    rndCounter = 0;
  }

  return newFieldData;
}

function setNewSizeFieldData(
  fieldData: number[][],
  sizeX: number,
  sizeY: number
): number[][] {
  const newFieldData = generateDataField(sizeX, sizeY);

  const stateSizeX: number = fieldData.length;
  const stateSizeY: number = fieldData[0].length;

  for (let i = 0; i < newFieldData.length; i += 1) {
    if (i > stateSizeX - 1) break;
    for (let j = 0; j < newFieldData[i].length; j += 1) {
      if (j > stateSizeY - 1) break;
      newFieldData[i][j] = fieldData[i][j];
    }
  }
  return newFieldData;
}

function generateDataField(sizeX: number, sizeY: number): number[][] {
  return new Array(sizeX).fill(null).map(() => new Array(sizeY).fill(0));
}

function nextStep(
  fieldData: number[][],
  fieldDataPrev: number[][]
): {
  fieldCurrent: number[][];
  fieldDataPrev: number[][];
  fieldDataPrev2: number[][];
} {
  const newFieldDataPrev2 = fieldDataPrev;
  const newFieldDataPrev = fieldData;
  const sizeX: number = fieldData.length;
  const sizeY: number = fieldData[0].length;
  const newFieldData = new Array(sizeX)
    .fill(null)
    .map(() => new Array(sizeY).fill(0));
  for (let i = 0; i < newFieldData.length; i += 1) {
    for (let j = 0; j < newFieldData[i].length; j += 1) {
      const countAround: number = getCountAround(fieldData, i, j);
      const currentCell = Boolean(fieldData[i][j]);
      if (
        (!currentCell && countAround == 3) ||
        (currentCell && (countAround == 3 || countAround == 2))
      ) {
        newFieldData[i][j] = 1;
      } else if (currentCell && countAround != 3 && countAround != 2) {
        newFieldData[i][j] = 0;
      }
    }
  }
  return {
    fieldCurrent: newFieldData,
    fieldDataPrev: newFieldDataPrev,
    fieldDataPrev2: newFieldDataPrev2,
  };
}

function getCountAround(fieldData: number[][], x: number, y: number): number {
  const coordX: number[] = [3];
  const coordY: number[] = [3];
  coordX[2] = x;
  coordY[2] = y;
  const stateSizeX: number = fieldData.length;
  const stateSizeY: number = fieldData[0].length;
  coordX[0] = x - 1 < 0 ? stateSizeX - 1 : x - 1; //sub
  coordX[1] = x + 1 == stateSizeX ? 0 : x + 1; //add
  coordY[0] = y - 1 < 0 ? stateSizeY - 1 : y - 1; //sub
  coordY[1] = y + 1 == stateSizeY ? 0 : y + 1; //add
  return (
    coordX.reduce(
      (accX, elemX) =>
        accX +
        coordY.reduce((accY, elemY) => accY + fieldData[elemX][elemY], 0),
      0
    ) - fieldData[x][y]
  );
}

function isFinish(
  fieldData: number[][],
  fieldDataPrev: number[][],
  fieldDataPrev2: number[][]
): boolean {
  const countLifeCell: number = fieldData
    .flat()
    .reduce((acc, item) => acc + item, 0);
  if (countLifeCell == 0) return true;
  for (let i = 0; i < fieldData.length; i += 1) {
    for (let j = 0; j < fieldData[i].length; j += 1) {
      if (
        fieldDataPrev[i][j] != fieldData[i][j] &&
        fieldDataPrev2[i][j] != fieldData[i][j]
      ) {
        return false;
      }
    }
  }
  return true;
}

function clickOnCell(fieldData: number[][], x: number, y: number): number[][] {
  const newFieldData = new Array(fieldData.length)
    .fill(null)
    .map((itemRow, indexRow) => [...fieldData[indexRow]]);
  newFieldData[x][y] = fieldData[x][y] ? 0 : 1;
  return newFieldData;
}
