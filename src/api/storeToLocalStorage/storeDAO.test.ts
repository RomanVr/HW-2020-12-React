import { initialState } from "@/modules/GameOfLife/gameRdx";
import { waitFor } from "@testing-library/react";
import { asyncStoreDAO } from "./storeDAO";

const setItemFn = jest.spyOn(window.localStorage.__proto__, "setItem");
const getItemFn = jest.spyOn(window.localStorage.__proto__, "getItem");

describe("Test StoreDAO", () => {
  const userName = "userName";
  it("saveState", async () => {
    await waitFor(() => asyncStoreDAO.saveState(userName, initialState), {
      timeout: 2000,
    });
    expect(setItemFn).toBeCalled();
  });
  it("loadState", async () => {
    await waitFor(() => asyncStoreDAO.loadState(userName), { timeout: 2000 });
    expect(getItemFn).toBeCalled();
  });

  it("loadState default", async () => {
    getItemFn.mockReturnValue(JSON.stringify(initialState));
    await waitFor(() => asyncStoreDAO.loadState(userName), { timeout: 2000 });
    expect(getItemFn).toBeCalled();
  });
});
