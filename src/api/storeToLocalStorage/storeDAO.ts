import { State } from "@/rdx/store";

export const asyncStoreDAO = {
  saveState: (state: State): Promise<void> =>
    Promise.resolve().then(function () {
      localStorage.setItem("state", JSON.stringify(state));
    }),
  loadState: (getStateFromLS: (arg0: State) => void): Promise<void> =>
    Promise.resolve().then(() => {
      const state = localStorage.getItem("store");
      if (state) {
        getStateFromLS(JSON.parse(state));
      }
    }),
};
