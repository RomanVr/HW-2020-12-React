import {
  Action,
  AnyAction,
  // applyMiddleware,
  // combineReducers,
} from "redux";
import gameReducer from "@/modules/GameOfLife/gameRdx";
import userReducer from "@/screens/Login/loginRdx";
import thunk from "redux-thunk";
import { asyncStoreDAO } from "@/api/storeToLocalStorage/storeDAO";
import { configureStore } from "@reduxjs/toolkit";

// export type State = {
//   user: {
//     userName: string;
//     statusUser: CheckState;
//   };
//   gameData: {
//     fieldCurrent: number[][];
//     fieldDataPrev: number[][];
//     fieldDataPrev2: number[][];
//     countStep: number;
//     start: boolean;
//     finish: boolean;
//     speed: number;
//   };
// };

// export const defaultState = {
//   user: {
//     userName: "",
//     statusUser: CheckState.initiated,
//   },
//   gameData: {
//     fieldCurrent: new Array(10).fill(null).map(() => new Array(10).fill(0)),
//     fieldDataPrev: new Array(10).fill(null).map(() => new Array(10).fill(0)),
//     fieldDataPrev2: new Array(10).fill(null).map(() => new Array(10).fill(0)),
//     countStep: 0,
//     start: false,
//     finish: false,
//     speed: 100,
//   },
// };

// const reducer = combineReducers({
//   user: userReducer,
//   gameData: gameReducer,
// });

export const LOAD_STATE = "LOAD_STATE";
export const loadStateAction = (
  saveState: (arg0: string) => void
): AnyAction => ({
  type: LOAD_STATE,
  payload: saveState,
});

const persistMiddleware =
  ({ getState }: { [key: string]: any }) =>
  (next: (arg0: Action) => void) =>
  (action: AnyAction) => {
    if (action.type === LOAD_STATE) {
      asyncStoreDAO.loadState(action.payload);
      return;
    }
    const result = next(action);
    asyncStoreDAO.saveState(getState());
    return result;
  };

const middleware = [thunk, persistMiddleware];

export const store = configureStore({
  reducer: {
    user: userReducer,
    gameData: gameReducer,
  },
  middleware: middleware,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
