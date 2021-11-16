import { initialState } from "@/modules/GameOfLife/gameRdx";
import { asyncStoreDAO } from "./storeDAO";
const setItemFn = jest.spyOn(window.localStorage.__proto__, "setItem");
const getItemFn = jest.spyOn(window.localStorage.__proto__, "getItem");

describe("Test StoreDAO", () => {
  const userName = "userName";
  it("saveState", async () => {
    await asyncStoreDAO.saveState(userName, initialState);
    expect(setItemFn).toBeCalled();
  });

  it("loadState error", async () => {
    getItemFn.mockReturnValueOnce(null);
    await expect(asyncStoreDAO.loadState(userName)).rejects.toEqual("No data!");
    expect(getItemFn).toBeCalledWith(userName);
  });

  it("loadState default", async () => {
    getItemFn.mockReturnValueOnce(JSON.stringify(initialState));
    await expect(asyncStoreDAO.loadState(userName)).resolves.toEqual(
      initialState
    );
    expect(getItemFn).toBeCalledWith(userName);
  });
});
