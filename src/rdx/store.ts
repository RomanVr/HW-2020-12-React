import { loginReducer } from "@/screens/Login/loginReducer";
import { combineReducers, createStore } from "redux";

export const actionTypes = {
  LOGIN: "login",
  LOGOUT: "logout",
};

export type Action = {
  type: string;
  payload?: any;
};

export enum CheckState {
  initiated,
  succeed,
  failed,
}

export type Store = {
  userName: string;
  statusUser: CheckState;
};

const reducer = combineReducers({
  login: loginReducer,
});

const stateDefault = {};

export const store = createStore(reducer, stateDefault);
