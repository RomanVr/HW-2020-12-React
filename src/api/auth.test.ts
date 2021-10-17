import { waitFor } from "@testing-library/react";
import { asyncLocalStorage } from "./auth";

const setItemFn = jest.spyOn(window.localStorage.__proto__, "setItem");
const removeItemFn = jest.spyOn(window.localStorage.__proto__, "removeItem");
const getItemFn = jest.spyOn(window.localStorage.__proto__, "getItem");

describe("Test auth", () => {
  it("login auth", async () => {
    await waitFor(() => asyncLocalStorage.login("user"), { timeout: 2000 });
    expect(setItemFn).toBeCalled();
  });
  it("logout auth", async () => {
    await waitFor(() => asyncLocalStorage.logout(), { timeout: 2000 });
    expect(removeItemFn).toBeCalled();
  });
  it("isLoggedIn auth", async () => {
    await waitFor(() => asyncLocalStorage.isLoggedIn(), { timeout: 2000 });
    expect(getItemFn).toBeCalled();
  });
});
