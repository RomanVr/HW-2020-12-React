import { GameState } from "@/modules/GameOfLife/gameRdx";
import { sleep } from "@/utils/sleep";

export const asyncStoreDAO = {
  saveState: async (userName: string, state: GameState): Promise<void> => {
    await sleep(1000);
    return Promise.resolve().then(function () {
      localStorage.setItem(userName, JSON.stringify(state));
    });
  },
  loadState: (userName: string): Promise<GameState> =>
    new Promise((resolve, reject) => {
      const state = localStorage.getItem(userName);
      if (state) {
        resolve(JSON.parse(state));
      } else {
        reject("No data!");
      }
    }),
};
