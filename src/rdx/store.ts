import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import gameReducer from "@/modules/GameOfLife/gameRdx";
import loginReducer, { CheckState } from "@/screens/Login/loginRdx";
import thunk from "redux-thunk";
import { asyncStoreDAO } from "@/api/storeToLocalStorage/storeDAO";

export type State = {
  login: {
    userName: string;
    statusUser: CheckState;
  };
  gameData: {
    fieldCurrent: number[][];
    fieldDataPrev: number[][];
    fieldDataPrev2: number[][];
    countStep: number;
    start: boolean;
    finish: boolean;
    speed: number;
  };
};

export const defaultState = {
  login: {
    userName: "",
    statusUser: CheckState.initiated,
  },
  gameData: {
    fieldCurrent: new Array(10).fill(null).map(() => new Array(10).fill(0)),
    fieldDataPrev: new Array(10).fill(null).map(() => new Array(10).fill(0)),
    fieldDataPrev2: new Array(10).fill(null).map(() => new Array(10).fill(0)),
    countStep: 0,
    start: false,
    finish: false,
    speed: 100,
  },
};

const reducer = combineReducers({
  login: loginReducer,
  gameData: gameReducer,
});

export default reducer;

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

export const store = createStore(
  reducer,
  defaultState,
  applyMiddleware(...middleware)
);
