import { Action } from "@/rdx";
import { AnyAction } from "redux";

export enum CheckState {
  initiated,
  succeed,
  failed,
}
export type StateLogin = {
  userName: string;
  statusUser: CheckState;
};

const initialState = {
  userName: "",
  statusUser: CheckState.initiated,
};

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export function login(userName: string): Action {
  return {
    type: LOGIN,
    payload: userName,
  };
}

export function logout(): Action {
  return { type: LOGOUT };
}

export default function loginReducer(
  state = initialState,
  action: AnyAction
): StateLogin {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userName: action.payload,
        statusUser: CheckState.succeed,
      };
    case LOGOUT:
      return {
        ...state,
        userName: "",
        statusUser: CheckState.failed,
      };
    default:
      return state;
  }
}
