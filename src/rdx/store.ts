import { applyMiddleware, combineReducers, createStore } from "redux";
import gameReducer from "@/modules/GameOfLife/gameRdx";
import loginReducer, { CheckState } from "@/screens/Login/loginRdx";
import thunk from "redux-thunk";

export type Store = {
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

const reducer = combineReducers({
  login: loginReducer,
  gameData: gameReducer,
});

const stateDefault = {};
export const store = createStore(reducer, stateDefault, applyMiddleware(thunk));
