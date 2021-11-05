import { RootState } from "@/rdx/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum CheckState {
  initiated,
  succeed,
  failed,
}
export type UserState = {
  userName: string;
  statusUser: CheckState;
};

const initialState: UserState = {
  userName: "",
  statusUser: CheckState.initiated,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.statusUser = CheckState.succeed;
    },
    logout: (state) => {
      state.userName = "";
      state.statusUser = CheckState.failed;
    },
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;
export const selectUserName = (state: RootState): string => state.user.userName;
