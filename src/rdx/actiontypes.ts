import { Dispatch } from "redux";
import { State } from "./store";

export const ERROR = "ERROR";

export type Action = {
  type: string;
  payload?: any;
};

export type ActionFunc = (
  dispatch: Dispatch<Action>,
  getState: () => State
) => void;
