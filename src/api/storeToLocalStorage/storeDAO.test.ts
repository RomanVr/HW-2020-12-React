import { defaultState } from "@/rdx/store";
import { waitFor } from "@testing-library/react";
import { asyncStoreDAO } from "./storeDAO";

const setItemFn = jest.spyOn(window.localStorage.__proto__, "setItem");
const getItemFn = jest.spyOn(window.localStorage.__proto__, "getItem");

describe("Test auth", () => {
  it("saveState", async () => {
    await waitFor(() => asyncStoreDAO.saveState(defaultState), {
      timeout: 2000,
    });
    expect(setItemFn).toBeCalled();
  });
  it("loadState", async () => {
    await waitFor(() => asyncStoreDAO.loadState(jest.fn()), { timeout: 2000 });
    expect(getItemFn).toBeCalled();
  });

  it("loadState default", async () => {
    getItemFn.mockReturnValue(JSON.stringify(defaultState));
    await waitFor(() => asyncStoreDAO.loadState(jest.fn()), { timeout: 2000 });
    expect(getItemFn).toBeCalled();
  });
});
