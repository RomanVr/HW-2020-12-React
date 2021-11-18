import { PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

export interface Action extends AnyAction {
  type: string;
  payload?: PayloadAction;
}
