import { waitFor } from "@testing-library/react";
import { isLoggedIn, login, logout } from "./auth";

jest.spyOn(window.localStorage.__proto__, "setItem");
jest.spyOn(window.localStorage.__proto__, "removeItem");
jest.spyOn(window.localStorage.__proto__, "getItem");
window.localStorage.__proto__.setItem = jest.fn();
window.localStorage.__proto__.removeItem = jest.fn();
window.localStorage.__proto__.getItem = jest.fn();

describe("Test auth", () => {
  it("login auth", async () => {
    await waitFor(() => login("user"), { timeout: 2000 });
    expect(localStorage.setItem).toBeCalled();
  });
  it("logout auth", async () => {
    await waitFor(() => logout(), { timeout: 2000 });
    expect(localStorage.removeItem).toBeCalled();
  });
  it("isLoggedIn auth", async () => {
    await waitFor(() => isLoggedIn(), { timeout: 2000 });
    expect(localStorage.getItem).toBeCalled();
  });
});
