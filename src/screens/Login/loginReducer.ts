import { Action, actionTypes, CheckState } from "@/rdx/store";

type State = {
  userName: string;
  statusUser: CheckState;
};

const initialState = {
  userName: "",
  statusUser: CheckState.initiated,
};

export const loginReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        userName: action.payload,
        statusUser: CheckState.succeed,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        userName: "",
        statusUser: CheckState.failed,
      };
    default:
      return state;
  }
};
