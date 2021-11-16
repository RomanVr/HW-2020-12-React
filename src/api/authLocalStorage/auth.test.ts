import { asyncAuthLocalStorage } from "./auth";

const setItemFn = jest.spyOn(window.localStorage.__proto__, "setItem");
const removeItemFn = jest.spyOn(window.localStorage.__proto__, "removeItem");
const getItemFn = jest.spyOn(window.localStorage.__proto__, "getItem");

const loginKey = "login";
const usenName = "user";

describe("Test auth", () => {
  it("login auth", async () => {
    await asyncAuthLocalStorage.login(usenName);
    expect(setItemFn).toBeCalledWith(loginKey, usenName);
  });
  it("logout auth", async () => {
    await asyncAuthLocalStorage.logout();
    expect(removeItemFn).toBeCalledWith(loginKey);
  });
  it("isLoggedIn auth", async () => {
    await asyncAuthLocalStorage.isLoggedIn();
    expect(getItemFn).toBeCalledWith(loginKey);
  });
});
